import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete({options, placeholder}) {
    return (
            <Autocomplete
            sx={{
                display: 'inline-block',
                '& input': {
                    width: '100%',
                    bgcolor: 'background.paper',
                    color: (theme) =>
                        theme.palette.getContrastText(theme.palette.background.paper),
                },
            }}
            id="custom-input-demo"
            options={options}
            renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                    <input placeholder = {placeholder} type="text" {...params.inputProps} />
                </div>
            )}
            />
    );
}