const { Pool } = require('pg');
var Chance = require('chance');

const pool = new Pool();
const chance = new Chance();

const regions = ['Europe', 'America', 'Asia', 'Middle East and Africa'];

const withinTransaction = async (client, fn) => {
    try {
        await client.query('begin');
        await fn();
        await client.query('commit');
    } catch (error) {
        console.error(error.message);
        await client.query('rollback');
        throw error;
    } finally {
        client.release();
    }
};

(async () => {
    const client = await pool.connect();

    await client.query('delete from regions');

    await withinTransaction(client, async () => {
        const regionResults = await Promise.all(
            regions.map((region) =>
                client
                    .query(
                        'insert into regions(region_name) VALUES ($1) returning region_id, region_name',
                        [region],
                    )
                    .then((r) => r.rows[0]),
            ),
        );

        console.log({ regionResults });
    });

    await pool.end();
})();
