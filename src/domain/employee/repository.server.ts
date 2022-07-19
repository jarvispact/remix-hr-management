import type { employee, Prisma } from '@prisma/client';
import { db } from '~/db.server';

const getById = (id: employee['id']) =>
    db.employee.findUnique({
        where: { id },
        include: { job: true, manager: true, department: true, employees: true },
    });

const getThisMonthsNewJoinersWhereClause = (): Prisma.employeeScalarWhereInput => {
    const now = new Date();
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const lastDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { hire_date: { gte: firstDayOfCurrentMonth, lte: lastDayOfCurrentMonth } };
};

const getThisMonthsNewJoiners = () =>
    db.employee.findMany({
        where: getThisMonthsNewJoinersWhereClause(),
        orderBy: { hire_date: 'desc' },
        include: { job: true, department: true },
        skip: 0,
        take: 10,
    });

const getThisMonthsNewJoinersCount = () =>
    db.employee.count({ where: getThisMonthsNewJoinersWhereClause() });

const getThisMonthsLeaversWhereClause = (): Prisma.employeeScalarWhereInput => {
    const now = new Date();
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return {
        AND: [{ leave_date: { not: undefined } }, { leave_date: { gte: firstDayOfCurrentMonth } }],
    };
};

const getThisMonthsLeavers = () =>
    db.employee.findMany({
        where: getThisMonthsLeaversWhereClause(),
        orderBy: { leave_date: 'desc' },
        include: { job: true, department: true },
        skip: 0,
        take: 10,
    });

const getThisMonthsLeaversCount = () =>
    db.employee.count({ where: getThisMonthsLeaversWhereClause() });

const getAll = () => db.employee.findMany({ skip: 0, take: 20 });

const countAll = () => db.employee.count();

export const EmployeeRespository = {
    getById,
    getThisMonthsNewJoiners,
    getThisMonthsNewJoinersCount,
    getThisMonthsLeavers,
    getThisMonthsLeaversCount,
    getAll,
    countAll,
};
