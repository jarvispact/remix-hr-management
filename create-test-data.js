const { Pool } = require('pg');
var Chance = require('chance');
const { countries } = require('./test-data/countries');
const jobs = require('./test-data/jobs');

const pool = new Pool();
const chance = new Chance();

const locationsPerCountry = 5;

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
    const client = await pool.connect();

    await withinTransaction(client, async () => {
        await client.query('delete from country');
        await client.query('delete from location');
        await client.query('delete from job');

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

        console.log({ countryResults });

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

        console.log({ locationResults });

        const jobResults = await Promise.all(
            jobs.map((job) => {
                const minSalary = chance.integer({ min: 2500, max: 2600 });
                const maxSalary = chance.integer({ min: 5000, max: 5100 });

                return client
                    .query(
                        'insert into job(id, job_title, min_salary, max_salary) VALUES ($1, $2, $3, $4) returning id',
                        [
                            chance.guid({ version: 4 }),
                            job,
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

        console.log({ jobResults });
    });

    await pool.end();
})();
