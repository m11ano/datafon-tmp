import { ReactNode, useState } from 'react';
import cls from './Counter.module.scss';

interface CounterProps {
    className?: string;
    children?: ReactNode;
}

export const Counter = (props: CounterProps) => {
    const { children, ...otherProps } = props;

    const [value, setValue] = useState<number>(0);

    return (
        <div className={cls.Counter}>
            <div>Value: {value}</div>
            <div>
                <span
                    onClick={() => {
                        setValue((v) => v + 1);
                    }}
                >
                    Add
                </span>
            </div>
        </div>
    );
};
