import React from 'react';
import { Device } from 'shared/lib/components/Device';

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
