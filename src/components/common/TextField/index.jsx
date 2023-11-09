import Typography from '../Typography';
import './styles.css';
import PropTypes from 'prop-types';

export default function TextField({
  label,
  name,
  value,
  onChange,
  helperText,
  placeholder,
  error,
  type = 'text',
  className = '',
  required = false,
  multiline = false, // Add a multiline prop
  rows = 4, // Number of rows for the textarea
}) {
  return (
      <div className={`textfield-container ${className}`}>
        {label &&
            <Typography variant={'body2'} className='label'>{label}</Typography>
        }
        {multiline ? ( // Use a textarea for multiline input
            <textarea
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? 'input-error' : ''}
                required={required}
                rows={rows} // Set the number of rows
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? 'input-error' : ''}
                required={required}
            />
        )}
        {helperText && (
            <Typography variant={'body3'} className={'helper-text ' + (error ? 'error' : '')}>
              {helperText}
            </Typography>
        )}
      </div>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'password', 'number']),
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};
