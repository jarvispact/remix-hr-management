import { useLocation, useParams } from 'react-router-dom';
import type { SupportedLanguage } from '~/i18n/i18n';
import { useI18n } from '~/i18n/i18n';

export const LanguageSwitch = () => {
    const { language = 'en' } = useParams<{ language: SupportedLanguage }>();
    const location = useLocation();
    const { t } = useI18n();
    const otherLanguage: SupportedLanguage = language === 'en' ? 'de' : 'en';

    return (
        <a
            href={location.pathname.replace(language, otherLanguage)}
            className="px-1 font-bold focus-visible:outline focus-visible:outline-focus focus-visible:outline-offset-2 focus-visible:outline-[1.5px]"
            aria-label={t(`common.language.link.switch-to-${otherLanguage}`) as string}
        >
            {otherLanguage.toUpperCase()}
        </a>
    );
};
