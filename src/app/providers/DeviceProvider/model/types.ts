export interface DeviceData {
    size: {
        width: number;
        height: number;
    };
    isClient: boolean;
}

export interface DeviceSchema {
    data?: DeviceData;
}
