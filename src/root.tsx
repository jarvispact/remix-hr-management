import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';
import { Page } from './components/page';
import { PageAside } from './components/page-aside';
import { PageHeader } from './components/page-header';
import type { SupportedLanguage } from './i18n/i18n';
import { I18nProvider } from './i18n/i18n';
import { createTranslationFunction, getSupportedLanguageCode } from './i18n/i18n';
import type { Translations } from './i18n/translations';
import { getTranslations } from './i18n/translations';
import { PageProvider } from './page-context';
import styles from './tailwind.css';

export const meta: MetaFunction = ({ params }) => {
    const { language } = params;
    const supportedLanguage = getSupportedLanguageCode(language);
    const translations = getTranslations(supportedLanguage);
    const t = createTranslationFunction(translations);

    return {
        charset: 'utf-8',
        title: t('common.meta.title'),
        description: t('common.meta.description'),
        viewport: 'width=device-width,initial-scale=1',
    } as { [Key: string]: string };
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type LoaderData = {
    language: SupportedLanguage;
    translations: Translations;
};

export const loader: LoaderFunction = ({ params }) => {
    const { language } = params;
    const supportedLanguage = getSupportedLanguageCode(language);
    const translations = getTranslations(supportedLanguage);
    return json<LoaderData>({ language: supportedLanguage, translations });
};

export default function App() {
    const { translations, language } = useLoaderData<LoaderData>();
    return (
        <html lang={language} className="motion-safe:scroll-smooth">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="theme bg-surface-0">
                <I18nProvider translations={translations}>
                    {({ t }) => (
                        <PageProvider>
                            <Page
                                header={<PageHeader h1={t('common.page.h1')} />}
                                aside={<PageAside h2={t('common.page-aside.h2')} />}
                            >
                                <Outlet />
                            </Page>
                        </PageProvider>
                    )}
                </I18nProvider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
