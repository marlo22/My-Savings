import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import { primaryColor } from '../../themes';

const StyledIcon = styled(Icon)`
  color: ${primaryColor};
  font-size: 22px;
  margin-horizontal: 10px;
`;

const ButtonIcon = ({ onPress, type = "AntDesign", name, buttonProps = {}, iconProps = {} }) => (
  <TouchableOpacity onPress={onPress} {...buttonProps}>
    <StyledIcon
      type={type}
      name={name}
      {...iconProps}
    />
  </TouchableOpacity>
);

ButtonIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  buttonProps: PropTypes.object,
  iconProps: PropTypes.object
};

export default ButtonIcon;