import type { employee } from '@prisma/client';
import type { department, job } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PageSection } from '~/components/page-section';
import type { PercentDifference } from '~/domain/common';
import { EmployeeRespository } from '~/domain/employee/repository.server';
import { getEmployeeDifferenceToLastYearInPercent } from '~/domain/employee/statistics';
import { LocationRespository } from '~/domain/location/repository.server';
import { getLocationDifferenceToLastYearInPercent } from '~/domain/location/statistics';
import { cx } from '~/utils/cx';

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
    return (
        <li className="w-full">
            <Link
                className="w-full bg-surface-1 rounded-md shadow-md block p-4 card-link"
                to="test"
            >
                <h3>{title}</h3>
                {children}
            </Link>
        </li>
    );
};

type LoaderData = {
    thisMonthNewJoiners: (employee & {
        department: department | null;
        job: job;
    })[];
    thisMonthNewJoinersCount: number;
    thisMonthLeavers: (employee & {
        department: department | null;
        job: job;
    })[];
    thisMonthLeaversCount: number;
    employeeCount: number;
    locationCount: number;
    employeeDifferenceToLastYear: PercentDifference;
    locationDifferenceToLastYear: PercentDifference;
};

export const loader: LoaderFunction = async () => {
    const [
        thisMonthNewJoiners,
        thisMonthNewJoinersCount,
        thisMonthLeavers,
        thisMonthLeaversCount,
        employeeCount,
        locationCount,
    ] = await Promise.all([
        EmployeeRespository.getThisMonthsNewJoiners(),
        EmployeeRespository.getThisMonthsNewJoinersCount(),
        EmployeeRespository.getThisMonthsLeavers(),
        EmployeeRespository.getThisMonthsLeaversCount(),
        EmployeeRespository.countAll(),
        LocationRespository.countAll(),
    ]);

    return json<LoaderData>({
        thisMonthNewJoiners,
        thisMonthNewJoinersCount,
        thisMonthLeavers,
        thisMonthLeaversCount,
        employeeCount,
        locationCount,
        employeeDifferenceToLastYear: getEmployeeDifferenceToLastYearInPercent(
            employeeCount * 1.05,
            employeeCount,
        ),
        locationDifferenceToLastYear: getLocationDifferenceToLastYearInPercent(
            locationCount * 0.97,
            locationCount,
        ),
    });
};

export default function Dashboard() {
    const {
        thisMonthNewJoiners,
        thisMonthNewJoinersCount,
        thisMonthLeavers,
        thisMonthLeaversCount,
        employeeCount,
        locationCount,
        employeeDifferenceToLastYear,
        locationDifferenceToLastYear,
    } = useLoaderData<LoaderData>();

    const cardData = useMemo(
        () => [
            {
                title: 'Employees',
                body: (
                    <div className="pt-4 flex flex-col gap-4">
                        <p className="text-4xl">{employeeCount}</p>
                        <div>
                            <span
                                className={cx([
                                    employeeDifferenceToLastYear.sign === '+' &&
                                        'text-success-text',
                                    employeeDifferenceToLastYear.sign === '-' && 'text-danger-text',
                                ])}
                            >
                                {employeeDifferenceToLastYear.formattedValue}
                            </span>
                            {employeeDifferenceToLastYear.sign === '+'
                                ? ' increase '
                                : ' decrease '}
                            compared to last year
                        </div>
                    </div>
                ),
            },
            {
                title: 'Locations',
                body: (
                    <div className="pt-4 flex flex-col gap-4">
                        <p className="text-4xl">{locationCount}</p>
                        <div>
                            <span
                                className={cx([
                                    locationDifferenceToLastYear.sign === '+' &&
                                        'text-success-text',
                                    locationDifferenceToLastYear.sign === '-' && 'text-danger-text',
                                ])}
                            >
                                {locationDifferenceToLastYear.formattedValue}
                            </span>
                            {locationDifferenceToLastYear.sign === '+'
                                ? ' increase '
                                : ' decrease '}
                            compared to last year
                        </div>
                    </div>
                ),
            },
        ],
        [employeeCount, locationCount, employeeDifferenceToLastYear, locationDifferenceToLastYear],
    );

    return (
        <div className="w-[95%] max-w-5xl mx-auto py-12 flex flex-col gap-16">
            <PageSection id="test" title="test" hideTitle>
                <ul className="flex gap-8 flex-col md:flex-row">
                    {cardData.map(({ title, body }) => (
                        <Card key={title} title={title}>
                            {body}
                        </Card>
                    ))}
                </ul>
            </PageSection>
            <PageSection
                id="test2"
                title={
                    thisMonthNewJoinersCount > 10
                        ? `Latest 10 out of ${thisMonthNewJoinersCount} new joiners this month`
                        : `${thisMonthNewJoinersCount} new joiners this month`
                }
            >
                <div className="overflow-x-auto whitespace-nowrap bg-surface-1 rounded-md shadow-md">
                    <table className="w-full">
                        <thead className="opacity-50">
                            <tr className="border-b border-b-border">
                                <th className="text-start p-4">Name</th>
                                <th className="text-start p-4">Job</th>
                                <th className="text-start p-4">Department</th>
                                <th className="text-start p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {thisMonthNewJoiners.map((employee, idx, arr) => (
                                <tr
                                    key={employee.id}
                                    className={cx([
                                        idx !== arr.length - 1 && 'border-b border-b-border',
                                    ])}
                                >
                                    <td className="text-start p-4 font-bold">{`${employee.first_name} ${employee.last_name}`}</td>
                                    <td className="text-start p-4">{employee.job.job_title}</td>
                                    <td className="text-start p-4">
                                        {employee.department?.department_name}
                                    </td>
                                    <td className="text-end p-4 pr-8">
                                        <Link className="table-link" to={`employee/${employee.id}`}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </PageSection>
            <PageSection
                id="test3"
                title={
                    thisMonthLeaversCount > 10
                        ? `Latest 10 out of ${thisMonthLeaversCount} leavers this month`
                        : `${thisMonthLeaversCount} leavers this month`
                }
            >
                <div className="overflow-x-auto whitespace-nowrap bg-surface-1 rounded-md shadow-md">
                    <table className="w-full">
                        <thead className="opacity-50">
                            <tr className="border-b border-b-border">
                                <th className="text-start p-4">Name</th>
                                <th className="text-start p-4">Job</th>
                                <th className="text-start p-4">Department</th>
                                <th className="text-start p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {thisMonthLeavers.map((employee, idx, arr) => (
                                <tr
                                    key={employee.id}
                                    className={cx([
                                        idx !== arr.length - 1 && 'border-b border-b-border',
                                    ])}
                                >
                                    <td className="text-start p-4 font-bold">{`${employee.first_name} ${employee.last_name}`}</td>
                                    <td className="text-start p-4">{employee.job.job_title}</td>
                                    <td className="text-start p-4">
                                        {employee.department?.department_name}
                                    </td>
                                    <td className="text-end p-4 pr-8">
                                        <Link className="table-link" to={`employee/${employee.id}`}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </PageSection>
        </div>
    );
}
