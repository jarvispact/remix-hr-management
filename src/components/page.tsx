import type { ReactNode } from 'react';
import { ids } from '~/dom-ids';

export type HomePageProps = {
    aside: ReactNode;
    header: ReactNode;
    children: ReactNode;
};

export const Page = ({ header, aside, children }: HomePageProps) => {
    return (
        <div className="text-text grid grid-cols-[280px_auto] grid-rows-[60px_auto] fixed inset-0">
            <aside aria-labelledby={ids.pageAside} className="row-span-2">
                {aside}
            </aside>
            <header aria-labelledby={ids.pageHeader} className="">
                {header}
            </header>
            <main className="">{children}</main>
        </div>
    );
};
