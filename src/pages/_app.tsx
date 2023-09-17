import { AppProps } from 'next/app';

import 'app/styles/index.less';

import { Layout } from '../app/layouts/Layout';
import { StoreProvider } from 'app/providers/StoreProvider';
import { DeviceProvider } from 'app/providers/DeviceProvider';

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
