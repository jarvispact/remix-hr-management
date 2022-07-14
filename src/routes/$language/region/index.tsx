import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

type TRegion = { region_id: number; region_name: string };

type LoaderData = {
    regions: TRegion[];
};

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({ regions: [] });
};

export default function Region() {
    const { regions } = useLoaderData<LoaderData>();
    console.log({ regions });

    return (
        <div>
            <h2>region</h2>
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
