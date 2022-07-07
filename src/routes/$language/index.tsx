import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Page } from '~/components/page';
import { PageHeader } from '~/components/page-header';
import { PageSection } from '~/components/page-section';
import { ids } from '~/dom-ids';
import { getSupportedLanguageCode, I18nProvider } from '~/i18n/i18n';
import type { Translations } from '~/i18n/translations';
import { getTranslations } from '~/i18n/translations';

type LoaderData = {
    translations: Translations;
};

export const loader: LoaderFunction = ({ params }) => {
    const { language } = params;
    const supportedLanguage = getSupportedLanguageCode(language);
    const translations = getTranslations(supportedLanguage);
    return json<LoaderData>({ translations });
};

export default function Index() {
    const { translations } = useLoaderData<LoaderData>();

    return (
        <I18nProvider translations={translations}>
            {({ t }) => (
                <Page header={<PageHeader h1={t('landing-page.h1')} />} footer={<div>footer</div>}>
                    <PageSection
                        id={ids.pageSectionWelcome}
                        title={t('landing-page.section-welcome-h2')}
                        hideTitle
                    >
                        <p>{t('landing-page.section-welcome-text')}</p>
                    </PageSection>
                </Page>
            )}
        </I18nProvider>
    );
}
