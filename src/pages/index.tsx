import { getDeviceData } from 'app/providers/DeviceProvider';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Page } from 'shared/lib/components/Page/';

export default function Main() {
    const data = useSelector(getDeviceData);

    const [value, setValue] = useState(0);

    return (
        <Page title="Главная">
            <div>
                Content {data.size.width} / {data.isClient ? 'true' : 'false'}
            </div>
            <div>Value = {value}</div>
            <div>
                ff
                <div>
                    <span
                        onClick={() => {
                            setValue((v) => v + 1);
                        }}
                    >
                        Add
                    </span>
                </div>
            </div>
            <div>GGG</div>
        </Page>
    );
}
