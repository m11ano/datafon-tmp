import { ReactNode, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deviceActions } from '../model/deviceSlice';
import { getWindowSize } from '../lib/getWindowSize';

interface DeviceProviderProps {
    children?: ReactNode;
}

export const DeviceProvider = (props: DeviceProviderProps) => {
    const { children } = props;

    const trottleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(deviceActions.setIsClient(true));
            dispatch(deviceActions.setDataSize(getWindowSize()));
        }, 1000);

        const onResize = () => {
            clearTimeout(trottleTimeoutRef.current);
            trottleTimeoutRef.current = setTimeout(() => {
                dispatch(deviceActions.setDataSize(getWindowSize()));
            }, 100);
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            clearTimeout(trottleTimeoutRef.current);
        };
    }, [dispatch]);

    return children;
};
