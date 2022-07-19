import { db } from '~/db.server';

const getAll = () => db.location.findMany({ skip: 0, take: 20 });

const countAll = () => db.location.count();

export const LocationRespository = {
    getAll,
    countAll,
};
