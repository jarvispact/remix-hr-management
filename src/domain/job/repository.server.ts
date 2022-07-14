import { db } from '~/db.server';

const getAll = () => db.job.findMany();

export const JobRespository = {
    getAll,
};
