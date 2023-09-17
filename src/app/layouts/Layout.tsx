import { ReactNode } from 'react';

interface LayoutProps {
    className?: string;
    children?: ReactNode;
}

export const Layout = (props: LayoutProps) => {
    const { children } = props;

    return (
        <div>
            <header>Шапка</header>
            {children}
            <footer>Подвал!</footer>
        </div>
    );
};
