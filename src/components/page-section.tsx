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
        <section aria-labelledby={id} className="">
            <h2 id={id} className={cx(['', hideTitle && 'sr-only'])}>
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
};
