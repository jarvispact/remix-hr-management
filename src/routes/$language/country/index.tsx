import type { country } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { CountryRespository } from '~/domain/country/repository.server';

type LoaderData = {
    countries: country[];
};

export const loader: LoaderFunction = async () => {
    const countries = await CountryRespository.getAll();
    return json<LoaderData>({ countries });
};

export default function Country() {
    const { countries } = useLoaderData<LoaderData>();
    console.log({ countries });

    return (
        <div>
            <h1>country</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.id}>
                        <Link to={country.id}>{country.country_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
