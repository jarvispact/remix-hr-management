import type { ReactNode } from 'react';
import { useContext } from 'react';
import { useMemo, useState } from 'react';
import { createContext } from 'react';

type Ctx = {
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
    openDrawerButtonId: string;
    closeDrawerButtonId: string;
};

const PageContext = createContext<Ctx>({
    isDrawerOpen: false,
    openDrawer: () => {},
    closeDrawer: () => {},
    toggleDrawer: () => {},
    openDrawerButtonId: 'open-drawer-button',
    closeDrawerButtonId: 'close-drawer-button',
});

type ChildrenAsAFunction = (ctx: Ctx) => ReactNode;

type Props = {
    children: ChildrenAsAFunction | ReactNode;
};

export const PageProvider = ({ children }: Props) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const openDrawerButtonId = 'open-drawer-button';
    const closeDrawerButtonId = 'close-drawer-button';

    const ctx = useMemo(
        () => ({
            isDrawerOpen,
            openDrawer: () => {
                setDrawerOpen(true);

                setTimeout(() => {
                    const closeDrawerButton = document.getElementById(
                        closeDrawerButtonId,
                    ) as HTMLButtonElement;

                    closeDrawerButton.focus();
                }, 50);
            },
            closeDrawer: () => {
                setDrawerOpen(false);

                setTimeout(() => {
                    const openDrawerButton = document.getElementById(
                        openDrawerButtonId,
                    ) as HTMLButtonElement;

                    openDrawerButton.focus();
                }, 50);
            },
            toggleDrawer: () => setDrawerOpen((prev) => !prev),
            openDrawerButtonId,
            closeDrawerButtonId,
        }),
        [isDrawerOpen, setDrawerOpen],
    );

    return (
        <PageContext.Provider value={ctx}>
            {typeof children === 'function' ? children(ctx) : children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => useContext(PageContext);
