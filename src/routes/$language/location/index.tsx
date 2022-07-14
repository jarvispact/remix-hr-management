import type { location } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { LocationRespository } from '~/domain/location/repository.server';

type LoaderData = {
    locations: location[];
};

export const loader: LoaderFunction = async () => {
    const locations = await LocationRespository.getAll();
    return json<LoaderData>({ locations });
};

export default function Location() {
    const { locations } = useLoaderData<LoaderData>();
    console.log({ locations });

    return (
        <div>
            <h1>location</h1>
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        <Link to={location.id}>{location.street_address}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
