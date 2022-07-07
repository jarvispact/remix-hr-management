import type { ReactNode } from 'react';
import { ids } from '~/dom-ids';
import { ClientSideOnly } from './client-side-only';
import { DarkModeToggle } from './dark-mode-toggle';
import { LanguageSwitch } from './language-switch';

type HeaderProps = {
    h1: ReactNode;
};

export const PageHeader = ({ h1 }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <h1 id={ids.pageHeader} className="text-2xl font-bold">
                {h1}
            </h1>
            <div className="flex justify-between items-center gap-4">
                <LanguageSwitch />
                <ClientSideOnly>
                    <DarkModeToggle />
                </ClientSideOnly>
            </div>
        </div>
    );
};
