import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { saveUserSettings } from '../../stores/actions/userSettings';
import { getAllSettings } from '../../stores/selectors/userSettings';

import { Form, Item, Label, Input, Button, Toast } from 'native-base';

import { getEditedInputValue } from '../../utils';

import { primaryContrastColor } from '../../themes/';

const labelStyle = { width: 150 };

const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ActionButton = styled(Button)`
  align-self: center;
  margin-top: 10px;
  margin-right: 5px;
`;

const ActionButtonText = styled.Text`
  color: ${primaryContrastColor};
`;

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const settings = useSelector(getAllSettings);

  const [draft, setDraft] = useState({});

  const handleDraftChange = (setting, value) => {
    setDraft(prevDraft => ({
      ...prevDraft,
      [setting]: value
    }));
  };

  const clearDraft = () => setDraft({});

  const save = async () => {
    try {
      await dispatch(saveUserSettings(draft));

      Toast.show({
        type: 'success',
        text: 'Ustawienia zostały zapisane.'
      });

      clearDraft();
    } catch(err) {
      Toast.show({
        type: 'danger',
        text: 'Wystąpił błąd podczas zapisywania ustawień.'
      });
    }
  };

  return (
    <>
      <Form>
        <Item inlineLabel>
          <Label style={labelStyle}>
            Waluta
          </Label>
          <Input
            onChangeText={value => handleDraftChange('currency', value)}
            value={getEditedInputValue(draft.currency, settings.get('currency'))}
          />
        </Item>
      </Form>
      <ButtonWrapper>
        <ActionButton onPress={save} disabled={!Object.keys(draft).length}>
          <ActionButtonText>Zapisz zmiany</ActionButtonText>
        </ActionButton>
        <ActionButton onPress={clearDraft} disabled={!Object.keys(draft).length}>
          <ActionButtonText>Anuluj</ActionButtonText>
        </ActionButton>
      </ButtonWrapper>
    </>
  );
}

export default SettingsScreen;