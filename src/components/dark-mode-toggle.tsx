import { useCallback, useEffect, useState } from 'react';
import SunIcon from '@heroicons/react/outline/SunIcon';
import MoonIcon from '@heroicons/react/outline/MoonIcon';
import { useI18n } from '~/i18n/i18n';

const darkModeAttrName = 'dark-mode';
type DarkModeAttribute = 'false' | 'true' | null;

export const DarkModeToggle = () => {
    const { t } = useI18n();

    const [darkModeAttribute, setDarkModeAttribute] = useState<DarkModeAttribute>(
        document.body.getAttribute(darkModeAttrName) as DarkModeAttribute,
    );

    const handleDarkModeToggleClick = useCallback(
        () =>
            setDarkModeAttribute((prevDarkModeAttribute) => {
                const { matches: systemDarkMode } = window.matchMedia(
                    '(prefers-color-scheme: dark)',
                );

                if (systemDarkMode) {
                    if (prevDarkModeAttribute === 'false') {
                        return 'true';
                    } else if (prevDarkModeAttribute === 'true') {
                        return 'false';
                    } else {
                        return 'false';
                    }
                } else {
                    if (prevDarkModeAttribute === 'false') {
                        return 'true';
                    } else if (prevDarkModeAttribute === 'true') {
                        return 'false';
                    } else {
                        return 'true';
                    }
                }
            }),
        [setDarkModeAttribute],
    );

    useEffect(() => {
        if (darkModeAttribute !== null) {
            document.body.setAttribute(darkModeAttrName, darkModeAttribute);
        }
    }, [darkModeAttribute]);

    if (darkModeAttribute === null) {
        const { matches: systemDarkMode } = window.matchMedia('(prefers-color-scheme: dark)');

        return (
            <button
                className="invisible-button"
                onClick={handleDarkModeToggleClick}
                aria-label={
                    (systemDarkMode
                        ? t('common.dark-mode.button.lights-on')
                        : t('common.dark-mode.button.lights-off')) as string
                }
            >
                {systemDarkMode ? (
                    <SunIcon className="w-6 h-6" />
                ) : (
                    <MoonIcon className="w-6 h-6" />
                )}
            </button>
        );
    }

    return (
        <button
            className="invisible-button"
            onClick={handleDarkModeToggleClick}
            aria-label={
                (darkModeAttribute === 'true'
                    ? t('common.dark-mode.button.lights-on')
                    : t('common.dark-mode.button.lights-off')) as string
            }
        >
            {darkModeAttribute === 'true' ? (
                <SunIcon className="w-6 h-6" />
            ) : (
                <MoonIcon className="w-6 h-6" />
            )}
        </button>
    );
};
