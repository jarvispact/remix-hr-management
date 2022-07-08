import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/pg.server';

type TEmployee = {
    employee_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    hire_date: string;
    job_id: number;
    salary: number;
    manager_id: number;
    department_id: number;
};

type LoaderData = {
    employees: TEmployee[];
};

export const loader: LoaderFunction = async () => {
    const res = await db.query('SELECT * FROM employees');
    return json<LoaderData>({ employees: res.rows });
};

export default function Employee() {
    const { employees } = useLoaderData<LoaderData>();
    console.log({ employees });

    return (
        <div className="font-sans">
            <h1>employee</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.employee_id}>
                        <Link to={employee.employee_id.toString()}>
                            {employee.first_name} {employee.last_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
