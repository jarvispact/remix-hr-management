import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

type TJob = { job_id: number; job_title: string; min_salary: number; max_salary: number };

type LoaderData = {
    jobs: TJob[];
};

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({ jobs: [] });
};

export default function Job() {
    const { jobs } = useLoaderData<LoaderData>();
    console.log({ jobs });

    return (
        <div>
            <h1>job</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.job_id}>
                        <Link to={job.job_id.toString()}>{job.job_title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
