import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Text } from 'react-native';
import { ListItem, Icon } from 'native-base';

const MenuItem = styled(ListItem)`
  border-bottom-width: 0;
  margin: 0;
  padding: 15px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(255, 255, 255, 0.4);
`;

const IconWrapper = styled.View`
  background-color: #ffffff;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-right: 10px;
`;

const NavMenuItem = ({ onPress, iconName, text }) => (
  <MenuItem onPress={onPress}>
    <IconWrapper>
      <Icon name={iconName} />
    </IconWrapper>
    <Text>{text}</Text>
  </MenuItem>
);

NavMenuItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default NavMenuItem;