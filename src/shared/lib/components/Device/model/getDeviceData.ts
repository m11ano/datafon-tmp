import { StateSchema } from 'app/providers/StoreProvider';

export const getDeviceData = (state: StateSchema) => {
    return state?.device?.data;
};
