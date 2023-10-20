import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import './style.css';

export default function AutoComplete({options, placeholder}) {
    return (
            <Autocomplete
            id="custom-input-demo"
            options={options}
            renderInput={(params) => (
                <div className={"input-box"}  ref={params.InputProps.ref}>
                    <input placeholder = {placeholder} type="text" {...params.inputProps} />
                </div>
            )}
            />
    );
}