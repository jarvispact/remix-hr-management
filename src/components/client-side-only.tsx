import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export const ClientSideOnly = ({ children }: { children: ReactNode }) => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (!hydrated) setHydrated(true);
    }, [hydrated]);

    return <>{hydrated ? children : null}</>;
};
