import type { job } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { JobRespository } from '~/domain/job/repository.server';

type LoaderData = {
    jobs: job[];
};

export const loader: LoaderFunction = async () => {
    const jobs = await JobRespository.getAll();
    console.log(jobs);

    return json<LoaderData>({ jobs });
};

export default function Job() {
    const { jobs } = useLoaderData<LoaderData>();
    console.log({ jobs });

    return (
        <div>
            <h1>job</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <Link to={job.id}>
                            {job.job_title} {job.min_salary} {job.max_salary}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
