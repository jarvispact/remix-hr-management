import { useEffect } from 'react';

export const useClickOutside = <T extends React.RefObject<HTMLElement>>(
    refs: T[],
    callback: () => void,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
};
