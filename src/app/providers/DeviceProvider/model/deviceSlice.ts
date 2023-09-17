import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DeviceData, DeviceSchema } from './types';

const initialState: DeviceSchema = {
    data: {
        width: 0,
        height: 0,
    },
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<DeviceData>) => {
            state.data = action.payload;
        },
    },
});

export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;
