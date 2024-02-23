import { useState, useEffect } from 'react';

/**
 * Dùng cho search inpput
 */
export const useDebounceValue = <T>(value: T, delay = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
