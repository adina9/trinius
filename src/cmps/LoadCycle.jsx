import React from 'react';

export function LoadCycle({ width, height, top, left }) {
    return (
        <div style={{ width, height, top, left }} className="lds-dual-ring flex a-center j-center left-trans"></div>
    );

}