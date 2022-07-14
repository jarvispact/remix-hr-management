import { db } from '~/db.server';

const getAll = () => db.country.findMany();

export const CountryRespository = {
    getAll,
};
