import type { PercentDifference } from '../common';

export const getLocationDifferenceToLastYearInPercent = (
    lastYearLocationCount: number,
    currentLocationCount: number,
): PercentDifference => {
    const percent = (currentLocationCount / lastYearLocationCount) * 100 - 100;
    const sign = percent > -0.001 && percent < 0.001 ? '' : percent > 0 ? '+' : '-';
    return {
        sign,
        formattedValue: `${sign}${Math.abs(percent).toFixed(2)}%`,
    };
};
