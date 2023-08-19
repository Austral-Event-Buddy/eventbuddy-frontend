import "./styles.css"
import PropTypes from "prop-types"

export default function Typography({variant, children, className=""}){
    return (
        <p className={`${variant} ${className}` }>
            {children}
        </p>
    )
}

Typography.propTypes = {
    variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2", "body3"]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}
