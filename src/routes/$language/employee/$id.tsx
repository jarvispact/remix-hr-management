import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { EmployeeRespository } from '~/domain/employee/repository.server';
import type { Employee } from '~/domain/employee/types';

type LoaderData = {
    employee: Employee;
};

export const loader: LoaderFunction = async ({ params }) => {
    const { id } = params;

    if (!id) {
        throw new Response('Not Found', {
            status: 404,
        });
    }

    const employee = await EmployeeRespository.getById(Number.parseInt(id, 10));
    return json<LoaderData>({ employee });
};

export default function EmployeeDetailPage() {
    const { employee } = useLoaderData<LoaderData>();

    return (
        <div className="w-[95%] max-w-5xl mx-auto py-12 flex flex-col gap-16">
            <pre>{JSON.stringify(employee, null, 2)}</pre>
        </div>
    );
}
