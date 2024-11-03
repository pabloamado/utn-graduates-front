import React from 'react';
import './InputRow.css';

function InputRow({ title, value, onChange, onSubmit, placeholder, buttonText }) {
    return (
        <div className="input-row">
            <h3>{title}</h3>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button onClick={onSubmit}>{buttonText}</button>
        </div>
    );
}

export default InputRow;