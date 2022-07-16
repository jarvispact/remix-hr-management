import { db } from '~/db.server';

const getAll = () => db.department.findMany();

export const DepartmentRespository = {
    getAll,
};
