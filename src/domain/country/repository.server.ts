import { db } from '~/db.server';

const getAll = () => db.country.findMany({ skip: 0, take: 20 });

export const CountryRespository = {
    getAll,
};
