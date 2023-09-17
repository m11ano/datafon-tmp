import { configureStore } from '@reduxjs/toolkit';
import { deviceReducer } from 'shared/lib/components/Device';

const store = configureStore({
    reducer: {
        device: deviceReducer,
    },
});

export { store };
