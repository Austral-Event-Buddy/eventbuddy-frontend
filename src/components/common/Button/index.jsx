import Typography from '../Typography';
import './styles.css';
import PropTypes from 'prop-types';
import Icon from '@mui/material/Icon';


export default function Button({
  text,
  variant = 'fullfilled',
  disabled,
  onClick,
  size = 'lg',
  className,
    startIcon,
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
        {startIcon && (
            <Icon>{startIcon}</Icon>
        )}
      <Typography variant={getTypographyVariant()}>{text}</Typography>
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['fullfilled', 'outlined', 'ghost', 'outlined-error']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
