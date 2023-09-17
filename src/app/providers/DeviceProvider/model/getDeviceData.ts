import { StateSchema } from 'app/providers/StoreProvider';

export const getDeviceData = (state: StateSchema) => {
    return (
        state?.device?.data || {
            size: {
                width: 0,
                height: 0,
            },
            isClient: false,
        }
    );
};
