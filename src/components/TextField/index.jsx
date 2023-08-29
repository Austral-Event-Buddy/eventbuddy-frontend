import Typography from "../Typography"
import "./styles.css"
import PropTypes from "prop-types"

export default function TextField({label, name, value, onChange, helperText, placeholder, error, style={}}){

    const buttonStyle = {
        width: "100%",
        ...style
    };

    return (
        <div className="textfield-container">
            <Typography variant={"body2"}>{label}</Typography>
            <input type="text" 
                placeholder={placeholder} 
                name={name}
                value={value} 
                onChange={onChange}
                className={error ? "input-error" : ""}
                style={buttonStyle}
            />
            {helperText && 
                <Typography variant={"body3"} className={error ? "error" : ""}>{helperText}</Typography>
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
    error: PropTypes.bool,
    style: PropTypes.object
}