import React from 'react';

export function ToggleWrapper({ obj, onUpdate }) {
    return (
        <div className="toggle-wrapper flex a-center j-center pr">
            <div className="toggle checkcross pa">
                <input type="text" />
                <label className="toggle-item" style={{ backgroundColor: obj.value ? '#ffeaabb5' : '#c6c6c6b5' }} onClick={() => onUpdate(obj.key, obj.value ? false : true)}>
                    <div className={obj.value ? 'check' : 'uncheck'}></div>
                </label>
            </div>
        </div>
    );
}
