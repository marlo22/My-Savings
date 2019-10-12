import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Modal as RNModal } from 'react-native';
import { Button, Icon } from 'native-base';

import { primaryColor, primaryContrastColor } from '../../themes';

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${primaryColor}
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 0 10px;
  color: ${primaryContrastColor};
`;

const CloseButton = styled(Button)`
  padding: 0;
`;

const CloseIcon = styled(Icon)`
  color: ${primaryContrastColor};
`;

const Modal = ({ visible, title, onClose, children }) => (
  <RNModal visible={visible}>
    <Header>
      <Title>
        {title}
      </Title>
      <CloseButton onPress={onClose} transparent>
        <CloseIcon name="close" />
      </CloseButton>
    </Header>
    {children}
  </RNModal>
);

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;