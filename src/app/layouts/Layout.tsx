import { ReactNode } from 'react';
import { Footer } from 'widgets/Footer';
import { Header } from 'widgets/Header/';

interface LayoutProps {
    className?: string;
    children?: ReactNode;
}

export const Layout = (props: LayoutProps) => {
    const { children } = props;

    return (
        <div id="root">
            <div className="content">
                <Header />
                <div className="page">{children}</div>
            </div>
            <Footer />
        </div>
    );
};
