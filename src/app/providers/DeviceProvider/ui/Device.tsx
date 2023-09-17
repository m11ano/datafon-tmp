import { ReactNode, memo, useEffect, useMemo, useState } from 'react';
import { DeviceData } from '../model/types';
import { useSelector } from 'react-redux';
import { getDeviceData } from '../model/getDeviceData';

interface DeviceChildrenProps extends Required<DeviceData> {
    isClient: boolean;
}

interface DeviceProps {
    onlyClient?: boolean;
    children: (props: DeviceChildrenProps) => ReactNode;
}

export const Device = memo(function Device(props: DeviceProps) {
    const { children, onlyClient = false } = props;
    const [isClient, setIsClient] = useState<boolean>(false);
    const data = useSelector(getDeviceData);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const childrenProps = useMemo<DeviceChildrenProps>(() => {
        return {
            ...data,
            isClient,
        };
    }, [data, isClient]);

    return (
        <>
            {(isClient && onlyClient) || !onlyClient
                ? children(childrenProps)
                : null}
        </>
    );
});
