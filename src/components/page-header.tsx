import type { ReactNode } from 'react';
import { ids } from '~/dom-ids';
import MenuIcon from '@heroicons/react/outline/MenuIcon';
import { ClientSideOnly } from './client-side-only';
import { DarkModeToggle } from './dark-mode-toggle';
import { LanguageSwitch } from './language-switch';
import { usePageContext } from '~/page-context';

type HeaderProps = {
    h1: ReactNode;
};

export const PageHeader = ({ h1 }: HeaderProps) => {
    const { openDrawer, openDrawerButtonId } = usePageContext();

    return (
        <div className="flex justify-between items-center h-full px-6 bg-surface-1">
            <div className="flex justify-between items-center gap-4">
                <button
                    id={openDrawerButtonId}
                    className="invisible-button lg:hidden"
                    onClick={openDrawer}
                >
                    <MenuIcon className="w-8 h-8" />
                </button>
                <h1 id={ids.pageHeader} className="text-2xl font-bold">
                    {h1}
                </h1>
            </div>
            <div className="flex justify-between items-center gap-4">
                <LanguageSwitch />
                <ClientSideOnly>
                    <DarkModeToggle />
                </ClientSideOnly>
            </div>
        </div>
    );
};
