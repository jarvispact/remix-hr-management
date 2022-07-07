import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';
import type { SupportedLanguage } from './i18n/i18n';
import { createTranslationFunction, getSupportedLanguageCode } from './i18n/i18n';
import { getTranslations } from './i18n/translations';
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

export const loader: LoaderFunction = ({ params }) => {
    const { language } = params;
    return getSupportedLanguageCode(language);
};

export default function App() {
    const language = useLoaderData<SupportedLanguage>();
    return (
        <html lang={language} className="motion-safe:scroll-smooth">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="theme bg-surface-0">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
