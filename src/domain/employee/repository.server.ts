import { db } from '~/pg.server';
import type { Employee } from './types';

export const EmployeeRespository = {
    getById: (id: Employee['employee_id']) =>
        db
            .query<Employee>('select * from employees where employee_id = $1', [id])
            .then((res) => res.rows[0]),
};
