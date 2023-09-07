import Typography from '../Typography';
import './styles.css';
import PropTypes from 'prop-types';

import logo from '../../../icons/eventBuddy-logo.svg';

export default function Brand({ size = 'md', className }) {
  function getLogoSize() {
    switch (size) {
      case 'lg':
        return 'logo-lg';
      case 'md':
        return 'logo-md';
      case 'sm':
      default:
        return 'logo-sm';
    }
  }

  function getBrandSize() {
    switch (size) {
      case 'lg':
        return 'h2';
      case 'md':
        return 'h4';
      case 'sm':
      default:
        return 'h5';
    }
  }

  return (
    <div className={`brand-container ${className}`}>
      <img alt="logo" src={logo} className={`logo ${getLogoSize()}`} />
      <Typography variant={getBrandSize()}>EventBuddy</Typography>
    </div>
  );
}

Brand.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
