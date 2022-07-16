const { Pool } = require('pg');
var Chance = require('chance');
const { countries } = require('./test-data/countries');
const { jobs } = require('./test-data/jobs');

const pool = new Pool();
const chance = new Chance();

const locationsPerCountry = 5;
const getEmployeesPerDepartment = () => chance.integer({ min: 1, max: 5 });

const uniqueDepartments = [...new Set(jobs.map((j) => j.department))];

const withinTransaction = async (client, fn) => {
    try {
        await client.query('begin');
        await fn();
        await client.query('commit');
    } catch (error) {
        console.error(error.message);
        await client.query('rollback');
        throw error;
    } finally {
        client.release();
    }
};

(async () => {
    console.log({ msg: 'starting to create test data' });
    const start = Date.now();
    const client = await pool.connect();

    await withinTransaction(client, async () => {
        console.log({ msg: 'resetting database' });

        await client.query('delete from employee');
        await client.query('delete from department');
        await client.query('delete from job');
        await client.query('delete from location');
        await client.query('delete from country');

        console.log({ msg: 'creating country data' });

        const countryResults = await Promise.all(
            countries.map(({ code, name }) =>
                client
                    .query(
                        'insert into country(id, country_code, country_name) VALUES ($1, $2, $3) returning id',
                        [chance.guid({ version: 4 }), code, name],
                    )
                    .then((r) => r.rows[0]),
            ),
        );

        console.log({ msg: `successfully created ${countryResults.length} countries` });
        console.log({ msg: 'creating location data' });

        const locationResults = [];

        for (const countryResult of countryResults) {
            const results = await Promise.all(
                [...new Array(locationsPerCountry)].map(() =>
                    client
                        .query(
                            'insert into location(id, street_address, postal_code, city, state_province, country_id) VALUES ($1, $2, $3, $4, $5, $6) returning id',
                            [
                                chance.guid({ version: 4 }),
                                chance.address(),
                                chance.zip(),
                                chance.city(),
                                chance.province({ full: true }),
                                countryResult.id,
                            ],
                        )
                        .then((r) => r.rows[0]),
                ),
            );

            locationResults.push(...results);
        }

        console.log({ msg: `successfully created ${locationResults.length} locations` });
        console.log({ msg: 'creating job data' });

        const jobResults = await Promise.all(
            jobs.map((job) => {
                const minSalary = chance.integer({ min: 2500, max: 2600 });
                const maxSalary = chance.integer({ min: 5000, max: 5100 });

                return client
                    .query(
                        'insert into job(id, job_title, min_salary, max_salary) VALUES ($1, $2, $3, $4) returning id, job_title',
                        [
                            chance.guid({ version: 4 }),
                            job.title,
                            chance.integer({
                                min: minSalary,
                                max: minSalary + chance.integer({ min: 0, max: 2000 }),
                            }),
                            chance.integer({
                                min: maxSalary,
                                max: maxSalary + chance.integer({ min: 5000, max: 10000 }),
                            }),
                        ],
                    )
                    .then((r) => r.rows[0]);
            }),
        );

        console.log({ msg: `successfully created ${jobResults.length} jobs` });
        console.log({ msg: 'creating department data' });

        const departmentResults = [];

        for (const locationResult of locationResults) {
            const results = await Promise.all(
                uniqueDepartments.map((department) =>
                    client
                        .query(
                            'insert into department(id, department_name, location_id) VALUES ($1, $2, $3) returning id, department_name',
                            [chance.guid({ version: 4 }), department, locationResult.id],
                        )
                        .then((r) => r.rows[0]),
                ),
            );

            departmentResults.push(...results);
        }

        console.log({ msg: `successfully created ${departmentResults.length} departments` });
        console.log({ msg: 'creating employee data' });

        const employeeResults = [];

        const getJobId = (departmentResult) => {
            const jobTitleForDepartment = jobs.find(
                (j) => j.department === departmentResult.department_name,
            ).title;

            return jobResults.find((j) => j.job_title === jobTitleForDepartment).id;
        };

        for (const departmentResult of departmentResults) {
            const minSalary = chance.integer({ min: 2500, max: 2600 });
            const maxSalary = chance.integer({ min: 5000, max: 5100 });

            const results = await Promise.all(
                [...new Array(getEmployeesPerDepartment())].map(() =>
                    client
                        .query(
                            'insert into employee(id, first_name, last_name, email, phone_number, hire_date, salary, job_id, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id',
                            [
                                chance.guid({ version: 4 }),
                                chance.first(),
                                chance.last(),
                                chance.email(),
                                chance.phone(),
                                chance.date({
                                    year: chance.pickone([
                                        2000, 2001, 2002, 2003, 2004, 2005, 2020, 2021, 2022,
                                    ]),
                                    month: chance.integer({ min: 0, max: new Date().getMonth() }),
                                }),
                                chance.integer({ min: minSalary, max: maxSalary }),
                                getJobId(departmentResult),
                                departmentResult.id,
                            ],
                        )
                        .then((r) => r.rows[0]),
                ),
            );

            employeeResults.push(...results);
        }

        console.log({ msg: `successfully created ${employeeResults.length} employees` });
        console.log({ msg: 'setting managers for employees' });

        const getRandomEmployeeIdx = () => Math.round(Math.random() * (employeeResults.length - 1));

        const managerIds = [...new Array(1000)].map(
            () => employeeResults[getRandomEmployeeIdx()].id,
        );

        const getRandomManagerIdx = () => Math.round(Math.random() * (managerIds.length - 1));

        for (const employee of employeeResults) {
            if (!managerIds.includes(employee.id)) {
                await client.query('update employee set manager_id = $1 where id = $2', [
                    managerIds[getRandomManagerIdx()],
                    employee.id,
                ]);
            }
        }

        console.log({ msg: `successfully set managers for ${employeeResults.length} employees` });
    });

    await pool.end();

    const end = Date.now();

    console.log({
        msg: `successfully created test data in ${Math.round((end - start) / 1000)} seconds`,
    });
})();
