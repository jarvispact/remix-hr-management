import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

type TCountry = { country_id: string; country_name: string; region_id: number };

type LoaderData = {
    countries: TCountry[];
};

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({ countries: [] });
};

export default function Country() {
    const { countries } = useLoaderData<LoaderData>();
    console.log({ countries });

    return (
        <div>
            <h1>country</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.country_id}>
                        <Link to={country.country_id.toString()}>{country.country_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
