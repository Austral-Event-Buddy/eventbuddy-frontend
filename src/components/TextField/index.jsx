import "./styles.css"
import PropTypes from "prop-types"

export default function TextField({label, name, value, onChange, helperText, placeholder, error}){
    return (
        <div className="textfield-container">
            <label>{label}</label>
            <input type="text" 
                placeholder={placeholder} 
                name={name} 
                value={value} 
                onChange={onChange} 
                className={error ? "input-error" : ""}
            />
            {helperText && 
                <small className={error ? "error" : ""}>{helperText}</small>
            }
        </div>
    )
}

TextField.propTypes ={
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    helperText: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool
}