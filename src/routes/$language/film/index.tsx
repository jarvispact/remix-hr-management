import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/pg.server';

type LoaderData = {
    films: { film_id: number; title: string }[];
};

export const loader: LoaderFunction = async () => {
    const filmDbResponse = await db.query('SELECT * FROM film');
    return json<LoaderData>({ films: filmDbResponse.rows });
};

export default function Index() {
    const { films } = useLoaderData<LoaderData>();
    console.log({ films });

    return (
        <div className="font-sans">
            <h1>Welcome to Remix</h1>
            <ul>
                {films.map((film) => (
                    <li key={film.film_id}>
                        <Link to={film.film_id.toString()}>{film.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
