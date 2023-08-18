import "./styles.css"
import PropTypes from "prop-types"

export default function Button({ children, variant = "fullfilled", disabled, onClick, size = "lg" }) {
    return (
        <button 
            className={`${variant}-btn  ${size}`} 
            disabled={disabled} 
            onClick={onClick}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["fullfilled", "outlined", "ghost"]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(["sm", "md", "lg"])
}