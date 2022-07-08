import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/pg.server';

type TJob = { job_id: number; job_title: string; min_salary: number; max_salary: number };

type LoaderData = {
    jobs: TJob[];
};

export const loader: LoaderFunction = async () => {
    const res = await db.query('SELECT * FROM jobs');
    return json<LoaderData>({ jobs: res.rows });
};

export default function Job() {
    const { jobs } = useLoaderData<LoaderData>();
    console.log({ jobs });

    return (
        <div className="font-sans">
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
