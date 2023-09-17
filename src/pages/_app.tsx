import { AppProps } from 'next/app';

import 'app/styles/index.scss';
import { Layout } from '../app/layouts/Layout';
import { StoreProvider } from 'app/providers/StoreProvider';
import { DeviceProvider } from 'shared/lib/components/Device';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider>
            <DeviceProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </DeviceProvider>
        </StoreProvider>
    );
}

export default MyApp;
