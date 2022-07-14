import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

type TLocation = {
    location_id: number;
    street_address: string;
    postal_code: string;
    city: string;
    state_province: string;
    country_id: number;
};

type LoaderData = {
    locations: TLocation[];
};

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({ locations: [] });
};

export default function Location() {
    const { locations } = useLoaderData<LoaderData>();
    console.log({ locations });

    return (
        <div>
            <h1>location</h1>
            <ul>
                {locations.map((location) => (
                    <li key={location.location_id}>
                        <Link to={location.location_id.toString()}>{location.street_address}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
