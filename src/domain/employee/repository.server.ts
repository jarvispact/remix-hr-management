import type { employee } from '@prisma/client';
import { db } from '~/db.server';

const getById = (id: employee['id']) => db.employee.findUnique({ where: { id } });

const getThisMonthsNewJoiners = () => {
    const now = new Date();
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const lastDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    console.log({ firstDayOfCurrentMonth, lastDayOfCurrentMonth });
    return db.employee.findMany({
        where: { hire_date: { gte: firstDayOfCurrentMonth, lte: lastDayOfCurrentMonth } },
        orderBy: { hire_date: 'desc' },
    });
};

const getAll = () => db.employee.findMany();

export const EmployeeRespository = {
    getById,
    getThisMonthsNewJoiners,
    getAll,
};
