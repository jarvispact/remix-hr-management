import { db } from '~/db.server';

const getAll = () => db.location.findMany();

export const LocationRespository = {
    getAll,
};
