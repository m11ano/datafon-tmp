import { ReactNode } from 'react';

export interface SliderPropsItem {
    child: ReactNode;
}

export interface SliderPropsSize {
    to: number;
    size: [number, number];
    changeHeightProp: boolean;
    className?: string;
}
