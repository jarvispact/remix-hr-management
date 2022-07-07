import type { ReactNode } from 'react';
import { cx } from '~/utils/cx';

type Props = {
    id: string;
    title: ReactNode;
    hideTitle?: boolean;
    children: ReactNode;
};

export const PageSection = ({ id, title, hideTitle, children }: Props) => {
    return (
        <section aria-labelledby={id} className="px-[5vw] 2xl:px-[15vw] 3xl:px-[22vw]">
            <h2
                id={id}
                className={cx(['text-3xl 2xl:text-4xl pb-6 2xl:pb-12', hideTitle && 'sr-only'])}
            >
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
};
