import type { employee } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { EmployeeRespository } from '~/domain/employee/repository.server';

type LoaderData = {
    employees: employee[];
};

export const loader: LoaderFunction = async () => {
    const employees = await EmployeeRespository.getAll();
    return json<LoaderData>({ employees });
};

export default function EmployeeListPage() {
    const { employees } = useLoaderData<LoaderData>();
    console.log({ employees });

    return (
        <div>
            <h1>employee</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        <Link to={employee.id.toString()}>
                            {employee.first_name} {employee.last_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
