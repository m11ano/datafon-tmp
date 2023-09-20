import { DeviceData } from '../model/types';

export interface onDeviceProps {
    size?: number;
    execOnServer?: boolean;
}

export const onDeviceWidth = (
    data: DeviceData,
    mode: 'big' | 'small',
    props: onDeviceProps = {},
): boolean => {
    const { size = 640 } = props;
    let { execOnServer } = props;

    if (execOnServer === undefined) {
        execOnServer = mode == 'big' ? true : false;
    }

    if (data.isClient == false) {
        return execOnServer;
    }

    if (mode == 'big') {
        if (data.size.width >= size) return true;
        return false;
    } else {
        if (data.size.width < size) return true;
        return false;
    }
};
