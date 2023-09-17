import { DeviceData } from '../model/types';

export const getWindowSize = (): DeviceData['size'] => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};
