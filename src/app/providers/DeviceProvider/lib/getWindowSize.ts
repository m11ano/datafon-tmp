import { DeviceData } from '../model/types';

export const getWindowSize = (): DeviceData => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};
