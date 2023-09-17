import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DeviceData, DeviceSchema } from './types';

const initialState: DeviceSchema = {
    data: {
        size: {
            width: 0,
            height: 0,
        },
        isClient: false,
    },
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDataSize: (state, action: PayloadAction<DeviceData['size']>) => {
            if (state.data) {
                state.data.size = action.payload;
            }
        },
        setIsClient: (state, action: PayloadAction<boolean>) => {
            if (state.data) {
                state.data.isClient = action.payload;
            }
        },
    },
});

export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;
