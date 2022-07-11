import type { ReactNode } from 'react';
import { useRef } from 'react';
import XIcon from '@heroicons/react/outline/XIcon';
import { ids } from '~/dom-ids';
import { usePageContext } from '~/page-context';
import { cx } from '~/utils/cx';
import { useClickOutside } from '~/utils/use-click-outside';
import { useI18n } from '~/i18n/i18n';

export type HomePageProps = {
    aside: ReactNode;
    header: ReactNode;
    children: ReactNode;
};

export const Page = ({ header, aside, children }: HomePageProps) => {
    const { t } = useI18n();
    const { isDrawerOpen, closeDrawer, closeDrawerButtonId } = usePageContext();
    const asideRef = useRef<HTMLDivElement>(null);
    useClickOutside([asideRef], closeDrawer);

    return (
        <div className="text-text lg:grid lg:grid-cols-[280px_auto] lg:grid-rows-[60px_auto] fixed inset-0">
            <div
                className={cx([
                    'fixed inset-0',
                    !isDrawerOpen && 'bg-transparent pointer-events-none',
                    isDrawerOpen && 'pointer-events-auto bg-black opacity-30',
                ])}
            ></div>
            <button
                id={closeDrawerButtonId}
                aria-label={t('common.drawer.close') as string}
                className={cx([
                    'invisible-button fixed top-[12px] transition-all',
                    !isDrawerOpen && 'opacity-0 left-[-100px] pointer-events-none',
                    isDrawerOpen && 'opacity-100 left-[290px] pointer-events-auto',
                ])}
                onClick={closeDrawer}
            >
                <XIcon className="w-10 h-10" />
            </button>
            <aside
                ref={asideRef}
                aria-labelledby={ids.pageAside}
                data-is-open={String(isDrawerOpen)}
                className="drawer lg:row-span-2"
            >
                {aside}
            </aside>
            <header aria-labelledby={ids.pageHeader} className="h-[60px]">
                {header}
            </header>
            <main className="">{children}</main>
        </div>
    );
};
