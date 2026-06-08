import type { RefObject } from 'react';

export const scrollToElement = (ref: RefObject<HTMLElement | null>) => {

    if ( !(ref && ref.current) ) return;

    const element = ref.current;

    const { top, bottom } = element.getBoundingClientRect();
    const isFullyVisible = top >= 0 && bottom <= window.innerHeight;

    if (!isFullyVisible) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};