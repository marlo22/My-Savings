import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { Button } from 'native-base';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

import { primaryContrastColor, borderRadius } from '../../themes';

const ModalWrapper = styled.View`
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const StyledModal = styled.View`
  width: 90%;
  height: 60%;
  background-color: #ffffff;
  border-radius: ${borderRadius};
`;

const ButtonsGroup = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px auto;
`;

const FooterButton = styled(Button)`
  margin: 0 5px;
`;

const ButtonText = styled.Text`
  color: ${primaryContrastColor};
`;

const ColorPicker = ({
  onOk,
  onClose,
  pickerProps = {}
}) => {
  const [value, setValue] = useState('');

  const handleSave = () => {
    const { h, s, v } = value;
    const hexValue = fromHsv({ h, s, v });

    onOk(hexValue);
    onClose();
  }

  return (
    <ModalWrapper visible={true} elevation={999}>
      <StyledModal>
        <TriangleColorPicker
          style={{ flex: 1 }}
          onColorChange={setValue}
          {...pickerProps}
        />
        <ButtonsGroup>
          <FooterButton onPress={onClose}>
            <ButtonText>Anuluj</ButtonText>
          </FooterButton>
          <FooterButton onPress={handleSave}>
            <ButtonText>Wybierz</ButtonText>
          </FooterButton>
        </ButtonsGroup>
      </StyledModal>
    </ModalWrapper>
  );
};

ColorPicker.propTypes = {
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  pickerProps: PropTypes.object
};

export default ColorPicker;