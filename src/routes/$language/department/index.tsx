import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

type TDepartment = { department_id: number; department_name: string; location_id: number };

type LoaderData = {
    departments: TDepartment[];
};

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({ departments: [] });
};

export default function Department() {
    const { departments } = useLoaderData<LoaderData>();
    console.log({ departments });

    return (
        <div>
            <h1>department</h1>
            <ul>
                {departments.map((department) => (
                    <li key={department.department_id}>
                        <Link to={department.department_id.toString()}>
                            {department.department_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
