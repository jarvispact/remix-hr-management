import type { PercentDifference } from '../common';

export const getEmployeeDifferenceToLastYearInPercent = (
    lastYearEmployeeCount: number,
    currentEmployeeCount: number,
): PercentDifference => {
    const percent = (currentEmployeeCount / lastYearEmployeeCount) * 100 - 100;
    const sign = percent > -0.001 && percent < 0.001 ? '' : percent > 0 ? '+' : '-';
    return {
        sign,
        formattedValue: `${sign}${Math.abs(percent).toFixed(2)}%`,
    };
};
