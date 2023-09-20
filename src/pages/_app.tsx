import { AppProps } from 'next/app';

import 'app/styles/index.less';

import { StoreProvider } from 'app/providers/StoreProvider';
import { DeviceProvider } from 'app/providers/DeviceProvider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider>
            <DeviceProvider>
                <Component {...pageProps} />
            </DeviceProvider>
        </StoreProvider>
    );
}

export default MyApp;
