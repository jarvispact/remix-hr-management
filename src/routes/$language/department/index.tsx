import type { department } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { DepartmentRespository } from '~/domain/department/repository.server';

type LoaderData = {
    departments: department[];
};

export const loader: LoaderFunction = async () => {
    const departments = await DepartmentRespository.getAll();
    return json<LoaderData>({ departments });
};

export default function Department() {
    const { departments } = useLoaderData<LoaderData>();

    return (
        <div>
            <h1>department</h1>
            <ul>
                {departments.map((department) => (
                    <li key={department.id}>
                        <Link to={department.id}>{department.department_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
