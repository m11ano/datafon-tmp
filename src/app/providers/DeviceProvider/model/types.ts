export interface DeviceData {
    size: {
        width: number;
        height: number;
    };
    checks: {
        flexGap: boolean;
    };
    isClient: boolean;
}

export interface DeviceSchema {
    data?: DeviceData;
}
