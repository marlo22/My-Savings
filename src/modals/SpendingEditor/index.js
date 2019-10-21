import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getSpendingCategories } from '../../stores/actions/categories';
import { addSpending, editSpending } from '../../stores/actions/spendings';
import { getCategoriesFetchStatus, getCategories } from '../../stores/selectors/categories';

import { Modal } from '../../components';
import { Form, Item, Label, Input, Button, Picker, Toast } from 'native-base';

import { primaryContrastColor } from '../../themes';

const labelStyle = { width: 160 };

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

const SpendingEditor = ({
  data = {},
  visible = true,
  onClose
}) => {
  const dispatch = useDispatch();
  const areCategoriesFetched = useSelector(getCategoriesFetchStatus);
  const categories = useSelector(getCategories);

  const [name, setName] = useState(data.name || '');
  const [category, setCategory] = useState(data.category || '');
  const [cost, setCost] = useState(data.cost || '');

  const hasData = !!Object.keys(data).length;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    if (areCategoriesFetched) return;
    await dispatch(getSpendingCategories());
  };

  const handleSave = async () => {
    if (hasData) {
      try {
        await dispatch(editSpending({ key: data.key, name, category, cost, date: data.date }));

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
        await dispatch(addSpending({ name, category, cost, date: Date.now() }));

        Toast.show({
          type: 'success',
          text: 'Wydatek został dodany.'
        });
      } catch {
        Toast.show({
          type: 'danger',
          text: 'Wystąpił błąd podczas dodawania wydatku.'
        });
      }
    }

    onClose();
  };

  const handleCategoryChange = category =>
    setCategory(category);

  return (
    <Modal
      title={`${hasData ? 'Edytuj' : 'Dodaj'} wydatek`}
      visible={visible}
      onClose={onClose}
    >
      <Form>
        <Item inlineLabel>
          <Label style={labelStyle}>
            Nazwa wydatku
          </Label>
          <Input onChangeText={setName} value={name} />
        </Item>
        <Item inlineLabel>
          <Label style={labelStyle}>
            Wartość wydatku
          </Label>
          <Input onChangeText={setCost} value={cost} />
        </Item>
        <Item inlineLabel>
          <Label style={labelStyle}>
            Kategoria
          </Label>
          <Picker
            mode="dropdown"
            style={{ width: undefined }}
            selectedValue={category}
            onValueChange={handleCategoryChange}
          >
            <Picker.Item
              label="Bez kategorii"
              value=""
            />
            {categories.keySeq().map((key => {
            const { name } = categories.get(key);
            return (
              <Picker.Item
                key={key}
                label={name}
                value={key}
              />
            )
            }))}
          </Picker>
        </Item>
      </Form>
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

SpendingEditor.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default SpendingEditor;