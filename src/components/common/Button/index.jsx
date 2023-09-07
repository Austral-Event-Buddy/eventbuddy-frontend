import Typography from '../Typography';
import './styles.css';
import PropTypes from 'prop-types';

export default function Button({
  text,
  variant = 'fullfilled',
  disabled,
  onClick,
  size = 'lg',
  className,
}) {
  function getTypographyVariant() {
    switch (size) {
      case 'lg':
        return 'body1bold';
      case 'md':
        return 'body2bold';
      case 'sm':
        return 'body3bold';
      default:
        return 'body1bold';
    }
  }

  return (
    <button
      className={`${variant}-btn ${size} ${className} btn`}
      disabled={disabled}
      onClick={onClick}
    >
      <Typography variant={getTypographyVariant()}>{text}</Typography>
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['fullfilled', 'outlined', 'ghost']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
