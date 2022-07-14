import { Pool } from 'pg';

const pool = new Pool();

const query = async <T>(sql: string, params?: (string | number)[]) => {
    const client = await pool.connect();

    try {
        return client.query<T>(sql, params);
    } catch (error) {
        console.log('error');
        throw new Response('Internal Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
};

export const db = {
    query,
};
