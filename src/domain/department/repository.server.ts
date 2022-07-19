import { db } from '~/db.server';

const getAll = () => db.department.findMany({ skip: 0, take: 20 });

export const DepartmentRespository = {
    getAll,
};
