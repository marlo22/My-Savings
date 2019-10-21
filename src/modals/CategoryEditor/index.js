import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { addSpendingCategory, editSpendingCategory } from '../../stores/actions/categories';

import { Modal, ColorPicker } from '../../components';
import { Form, Item, Label, Input, Button, Toast } from 'native-base';

import { primaryContrastColor } from '../../themes';

const labelStyle = { width: 150 };

const ButtonsGroup = styled.View`
  flex-direction: row;
  margin: 10px auto;
  justify-content: flex-end;
`;

const FooterButton = styled(Button)`
  margin: 0 5px;
`;

const ButtonText = styled.Text`
  color: ${primaryContrastColor};
`;

const CategoryEditorModal = ({
  data = {},
  visible = true,
  onClose
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(data.name || '');
  const [color, setColor] = useState(data.color || '');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const hasData = !!Object.keys(data).length;

  const handleSave = async () => {
    if (hasData) {
      try {
        await dispatch(editSpendingCategory({ key: data.key, name, color }));

        Toast.show({
          type: 'success',
          text: 'Zmiany zostały zapisane.'
        });
      } catch {
        Toast.show({
          type: 'danger',
          text: 'Wystąpił błąd podczas zapisywania zmian.'
        });
      }
    } else {
      try {
        await dispatch(addSpendingCategory({ name, color }));

        Toast.show({
          type: 'success',
          text: 'Kategoria została dodana.'
        });
      } catch {
        Toast.show({
          type: 'danger',
          text: 'Wystąpił błąd podczas dodawania kategorii.'
        });
      }
    }

    onClose();
  };

  return (
    <Modal
      title={`${hasData ? 'Edytuj' : 'Dodaj'} kategorię`}
      visible={visible}
      onClose={onClose}
    >
      <Form>
        <Item inlineLabel>
          <Label style={labelStyle}>
            Nazwa kategorii
          </Label>
          <Input onChangeText={setName} value={name} />
        </Item>
        <Item inlineLabel>
          <Label style={labelStyle}>
            Kolor kategorii
          </Label>
          <Input
            value={color}
            onChangeText={setColor}
            onFocus={() => setIsColorPickerOpen(true)}
            onBlur={() => setIsColorPickerOpen(false)}
          />
        </Item>
      </Form>
      {isColorPickerOpen && (
        <ColorPicker
          onOk={setColor}
          onClose={() => setIsColorPickerOpen(false)}
        />
      )}
      <ButtonsGroup>
        <FooterButton onPress={onClose}>
          <ButtonText>Anuluj</ButtonText>
        </FooterButton>
        <FooterButton onPress={handleSave}>
          <ButtonText>Zapisz</ButtonText>
        </FooterButton>
      </ButtonsGroup>
    </Modal>
  );
}

CategoryEditorModal.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CategoryEditorModal;