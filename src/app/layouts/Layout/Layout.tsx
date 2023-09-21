import Head from 'next/head';
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
        <>
            <Head>
                <link rel="icon" sizes="32x32" href="/favicon_32.ico" />
                <link rel="icon" sizes="16x16" href="/favicon.ico" />
            </Head>
            <div id="root">
                <div className="content">
                    <Header />
                    <main>{children}</main>
                </div>
                <Footer />
            </div>
        </>
    );
};
