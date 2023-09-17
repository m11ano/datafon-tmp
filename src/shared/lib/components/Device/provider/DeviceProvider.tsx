import { ReactNode, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deviceActions, getWindowSize } from 'shared/lib/components/Device';

interface DeviceProviderProps {
    children?: ReactNode;
}

export const DeviceProvider = (props: DeviceProviderProps) => {
    const { children } = props;

    const trottleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(deviceActions.setData(getWindowSize()));

        const onResize = () => {
            clearTimeout(trottleTimeoutRef.current);
            trottleTimeoutRef.current = setTimeout(() => {
                dispatch(deviceActions.setData(getWindowSize()));
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
