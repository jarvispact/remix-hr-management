import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSupportedLanguageCode } from '~/i18n/i18n';

export const loader: LoaderFunction = ({ request }) => {
    const acceptLanguage = request.headers.get('accept-language');

    const language = acceptLanguage
        ? acceptLanguage.substring(0, acceptLanguage.indexOf(','))
        : 'en';

    const supportedLanguage = getSupportedLanguageCode(language);
    return redirect(`/${supportedLanguage}`);
};
