import { db } from '~/db.server';

const getAll = () => db.job.findMany({ skip: 0, take: 20 });

export const JobRespository = {
    getAll,
};
