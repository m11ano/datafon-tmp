import React from 'react';
import Device from 'shared/lib/components/Device/ui';

export default function Home() {
    return (
        <div>
            <Device>{(d) => <div>{d.width} - 1</div>}</Device>
            <Device>{(d) => <div>{d.width} - 2</div>}</Device>
        </div>
    );
}
