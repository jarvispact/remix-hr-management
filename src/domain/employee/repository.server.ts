import type { employees } from '@prisma/client';
import { db } from '~/db.server';

const getById = (id: employees['employee_id']) =>
    db.employees.findUnique({ where: { employee_id: id } });

const getThisMonthsNewJoiners = () => {
    const now = new Date();
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const lastDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    console.log({ firstDayOfCurrentMonth, lastDayOfCurrentMonth });
    return db.employees.findMany({
        where: { hire_date: { gte: firstDayOfCurrentMonth, lte: lastDayOfCurrentMonth } },
        orderBy: { hire_date: 'desc' },
    });
};

const getAll = () => db.employees.findMany();

export const EmployeeRespository = {
    getById,
    getThisMonthsNewJoiners,
    getAll,
};
