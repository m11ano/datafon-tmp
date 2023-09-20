import { StateSchema } from 'app/providers/StoreProvider';
import { DeviceData } from './types';

export const getDeviceData = (state: StateSchema): DeviceData => {
    return (
        state?.device?.data || {
            size: {
                width: 0,
                height: 0,
            },
            checks: {
                flexGap: true,
            },
            isClient: false,
        }
    );
};
