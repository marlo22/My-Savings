import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';

const InputIcon = ({ status }) => {
  if (status) {
    return <Icon name="checkmark-circle" />;
  }

  if (status === false) {
    return <Icon name="close-circle" />
  }

  return null;
};

InputIcon.propTypes = {
  status: PropTypes.bool
};

export default InputIcon;