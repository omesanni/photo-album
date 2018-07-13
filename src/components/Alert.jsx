import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Alert = props => (
  <div className={'alert'}>
    <h5 className={'alert__message'}>
      {props.message}
    </h5>
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
