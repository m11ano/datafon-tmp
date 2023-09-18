import { ReactNode, useMemo } from 'react';
import { DeviceData } from '../model/types';
import { useSelector } from 'react-redux';
import { getDeviceData } from '../model/getDeviceData';

interface DeviceChildrenProps extends Required<DeviceData> {}

interface DeviceProps {
    onlyClient?: boolean;
    children: (props: DeviceChildrenProps) => ReactNode;
}

export const Device = (props: DeviceProps) => {
    const { children, onlyClient = false } = props;
    const data = useSelector(getDeviceData);

    return useMemo(() => {
        return (data.isClient && onlyClient) || !onlyClient
            ? children(data)
            : null;
    }, [data, onlyClient, children]);
};
