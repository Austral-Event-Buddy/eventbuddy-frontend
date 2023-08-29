import Typography from "../Typography"
import "./styles.css"
import PropTypes from "prop-types"

export default function Button({ text, variant = "fullfilled", disabled, onClick, size = "lg",  style={}, children}) {

    function getTypographyVariant() {
        switch (size) {
            case "lg":
                return "body1"
            case "md":
                return "body2"
            case "sm":
                return "body3"
            default:
                return "body1"
        }
    }

    const buttonStyle = {
        width: "100%",
        justifyContent: "center",
        ...style
    };

    return (
        <button
            className={`${variant}-btn  ${size}`}
            disabled={disabled}
            onClick={onClick}
            style={buttonStyle}
        >
            {children}
            <Typography variant={getTypographyVariant()}>
                {text}
            </Typography>
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(["fullfilled", "outlined", "ghost"]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    style: PropTypes.object,
    children: PropTypes.node,
}