import type { ReactNode } from 'react';
import { ids } from '~/dom-ids';

export type HomePageProps = {
    header: ReactNode;
    footer: ReactNode;
    children: ReactNode;
};

export const Page = ({ header, footer, children }: HomePageProps) => {
    return (
        <div className="text-text flex flex-col gap-12 md:gap-20">
            <header
                aria-labelledby={ids.pageHeader}
                className="py-8 md:py-12 px-[5vw] 2xl:px-[15vw] 3xl:px-[22vw]"
            >
                {header}
            </header>
            <main className="flex flex-col gap-20">{children}</main>
            <footer
                aria-labelledby={ids.pageFooter}
                className="py-20 px-[5vw] 2xl:px-[15vw] 3xl:px-[22vw] border-t border-t-border"
            >
                {footer}
            </footer>
        </div>
    );
};
