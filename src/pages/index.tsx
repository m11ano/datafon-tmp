import { Device } from 'app/providers/DeviceProvider';
import React from 'react';

export default function Home() {
    return (
        <div>
            <Device onlyClient={true}>
                {(d) => (
                    <div>
                        {d.width} {d.isClient ? 'true' : 'false'} - первый
                    </div>
                )}
            </Device>
            <Device>
                {(d) => (
                    <div>
                        {d.width} {d.isClient ? 'true' : 'false'} - второй
                    </div>
                )}
            </Device>
        </div>
    );
}
