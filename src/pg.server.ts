import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool();
const prisma = new PrismaClient();

prisma.employees.findUnique({ where: { employee_id: 42 } });

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
