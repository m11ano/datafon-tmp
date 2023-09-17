import { ReactNode } from 'react';
import { Counter } from '../../shared/Counter/Counter';

interface LayoutProps {
    className?: string;
    children?: ReactNode;
}

export const Layout = (props: LayoutProps) => {
    const { children } = props;
    return (
        <div>
            <header>
                Шапка
                <Counter />
            </header>
            {children}
            <footer>Подвал!</footer>
        </div>
    );
};
