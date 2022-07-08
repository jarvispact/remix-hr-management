import type { ReactNode } from 'react';
import { createElement, Fragment, useContext, useMemo, createContext } from 'react';

export type SupportedLanguage = 'de' | 'en';

const languageMap: { [K: string]: SupportedLanguage } = {
    de: 'de',
    'de-AT': 'de',
    'de-DE': 'de',
    'de-CH': 'de',

    en: 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'en-AU': 'en',
    'en-CA': 'en',
};

export const getSupportedLanguageCode = (unknownLanguage?: string): SupportedLanguage => {
    if (!unknownLanguage) return 'en';
    const supportedLanguage = languageMap[unknownLanguage as keyof typeof languageMap];
    if (!supportedLanguage) return 'en';
    return supportedLanguage;
};

type CommonTranslationKey =
    | 'meta.title'
    | 'meta.description'
    | 'language.link.switch-to-en'
    | 'language.link.switch-to-de'
    | 'dark-mode.button.lights-on'
    | 'dark-mode.button.lights-off'
    | 'page-aside.h2';

type DashboardTranslationKey = 'h1';

export type TranslationKey =
    | `common.${CommonTranslationKey}`
    | `dashboard.${DashboardTranslationKey}`;

const replaceIndexWithInterpolation =
    (interpolations: (string | number)[] = []) =>
    (match: string) => {
        const idx = Number.parseInt(match.substring(1, match.length - 1));
        return Number.isNaN(idx) ? match : interpolations[idx]?.toString() || `{${idx}}`;
    };

type Translations = { [TK in TranslationKey]: string };

type UnknownHtmlRenderProps = {
    htmlTag: SupportedHtmlTag;
    props: Partial<Record<string, any>>;
    children: string;
};

type Options = {
    renderHtmlTag?: (renderProps: UnknownHtmlRenderProps) => ReactNode;
};

const defaultRenderHtmlTag = (renderProps: UnknownHtmlRenderProps) =>
    createElement(renderProps.htmlTag, renderProps.props, renderProps.children);

const supportedHtmlTags = ['a', 'i', 'b', 'strong'] as const;
type SupportedHtmlTag = typeof supportedHtmlTags[number];

const isSupportedHtmlTag = (htmlTag: string): htmlTag is SupportedHtmlTag =>
    supportedHtmlTags.includes(htmlTag as SupportedHtmlTag);

const htmlTagRegex = /<([a-z]+)(.*?)>(.*?)<\/([a-z]+?)>/g;

export const createTranslationFunction =
    (translations: Translations, options: Options = {}) =>
    // eslint-disable-next-line react/display-name
    (tk: TranslationKey, interpolations: (string | number)[] = []) => {
        const translation = translations[tk];
        if (!translation) return `[${tk}]`;

        const withReplacedIndices = translations[tk].replace(
            /{\d+}/g,
            replaceIndexWithInterpolation(interpolations),
        );

        const htmlTagMatches: RegExpExecArray[] = [];

        let htmlTagMatch;
        while ((htmlTagMatch = htmlTagRegex.exec(withReplacedIndices)) !== null) {
            htmlTagMatches.push(htmlTagMatch);
        }

        if (htmlTagMatches.length > 0) {
            const renderElement = options.renderHtmlTag || defaultRenderHtmlTag;
            const parts = withReplacedIndices.split(/<.*?>.*?<\/.*?>/);

            return parts
                .flatMap((part, idx) => {
                    if (!part) return null;
                    if (!htmlTagMatches[idx]) return part;

                    const [, openingHtmlTag, htmlAttributes, innerHtml, closingHtmlTag] =
                        htmlTagMatches[idx];

                    if (openingHtmlTag !== closingHtmlTag) return null;

                    if (!isSupportedHtmlTag(openingHtmlTag)) return null;

                    const trimmedHtmlAttributes = htmlAttributes.trim();
                    const props = trimmedHtmlAttributes
                        ? trimmedHtmlAttributes.split(' ').reduce((accum, attrPair) => {
                              const [attrName, attrValue] = attrPair.split('=');
                              const attrValueWithoutQuotes = attrValue.replace(/"/g, '').trim();
                              accum[attrName.trim()] = attrValueWithoutQuotes;
                              return accum;
                          }, {} as Record<string, any>)
                        : {};

                    return [
                        part,
                        <Fragment key={idx}>
                            {renderElement({
                                htmlTag: openingHtmlTag,
                                props,
                                children: innerHtml,
                            })}
                        </Fragment>,
                    ];
                })
                .filter(Boolean);
        }

        return withReplacedIndices;
    };

type Ctx = {
    t: (tk: TranslationKey, interpolations?: (string | number)[]) => ReactNode;
};

const I18nContext = createContext<Ctx | null>(null);

type ChildrenAsAFunction = ({ t }: Ctx) => ReactNode;

type Props = {
    translations: Translations;
    children: ReactNode | ChildrenAsAFunction;
};

export const I18nProvider = ({ children, translations }: Props) => {
    const ctx = useMemo(() => ({ t: createTranslationFunction(translations) }), [translations]);
    return (
        <I18nContext.Provider value={ctx}>
            {typeof children === 'function' ? children(ctx) : children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => useContext(I18nContext) as Ctx;
