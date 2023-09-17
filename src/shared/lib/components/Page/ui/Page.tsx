import Head from 'next/head';
import { ReactNode, memo } from 'react';

interface PageProps {
    children?: ReactNode;
    title?: string;
}

export const Page = memo(function Page(props: PageProps) {
    const { children, title } = props;

    return (
        <>
            <Head>{title && <title>{title}</title>}</Head>
            {children}
        </>
    );
});
