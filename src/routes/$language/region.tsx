import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/pg.server';

type TRegion = { region_id: number; region_name: string };

type LoaderData = {
    regions: TRegion[];
};

export const loader: LoaderFunction = async () => {
    const res = await db.query('SELECT * FROM regions');
    return json<LoaderData>({ regions: res.rows });
};

export default function Region() {
    const { regions } = useLoaderData<LoaderData>();
    console.log({ regions });

    return (
        <div className="font-sans">
            <h1>region</h1>
            <ul>
                {regions.map((region) => (
                    <li key={region.region_id}>
                        <Link to={region.region_id.toString()}>{region.region_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
