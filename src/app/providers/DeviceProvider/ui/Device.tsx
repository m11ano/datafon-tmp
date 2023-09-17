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

    const childrenProps = useMemo<DeviceChildrenProps>(() => {
        return data;
    }, [data]);

    return (
        <>
            {(data.isClient && onlyClient) || !onlyClient
                ? children(childrenProps)
                : null}
        </>
    );
};
