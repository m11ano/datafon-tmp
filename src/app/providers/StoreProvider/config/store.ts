import { configureStore } from '@reduxjs/toolkit';
import { deviceReducer } from 'app/providers/DeviceProvider';

const store = configureStore({
    reducer: {
        device: deviceReducer,
    },
});

export { store };
