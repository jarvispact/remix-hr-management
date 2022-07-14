import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { Employee } from '~/domain/employee/types';
import { db } from '~/pg.server';

type LoaderData = {
    employees: Employee[];
};

export const loader: LoaderFunction = async () => {
    const res = await db.query('SELECT * FROM employees');
    return json<LoaderData>({ employees: res.rows as Employee[] });
};

export default function EmployeeListPage() {
    const { employees } = useLoaderData<LoaderData>();
    console.log({ employees });

    return (
        <div>
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
