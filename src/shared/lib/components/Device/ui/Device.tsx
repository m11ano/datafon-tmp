import { ReactNode, useEffect, useState } from 'react';
import { DeviceData } from '../model/types';
import { getDeviceData } from '../model/getDeviceData';
import { useSelector } from 'react-redux';

interface DeviceProps {
    children: (props: DeviceData) => ReactNode;
}

export default function Device(props: DeviceProps) {
    const [isClient, setIsClient] = useState<boolean>(false);

    const data = useSelector(getDeviceData);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return <>{isClient && data ? props.children(data) : null}</>;
}
