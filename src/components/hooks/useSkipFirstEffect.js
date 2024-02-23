import { useEffect, useRef } from 'react';

export const useSkipFirstEffect = (callback, dependencies) => {
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            // Skip the first render
            isInitialRender.current = false;
        } else {
            // Execute the callback for subsequent renders
            return callback();
        }
    }, dependencies);
};
