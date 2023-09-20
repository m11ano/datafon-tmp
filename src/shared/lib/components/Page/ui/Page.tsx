import { Layout } from 'app/layouts/Layout';
import Head from 'next/head';
import { ReactNode } from 'react';

interface PageProps {
    children?: ReactNode;
    title?: string;
}

export const Page = (props: PageProps) => {
    const { children, title } = props;

    return (
        <>
            <Head>{title && <title>{title}</title>}</Head>
            <Layout>{children}</Layout>
        </>
    );
};
