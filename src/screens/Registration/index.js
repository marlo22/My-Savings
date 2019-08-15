import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../../api/firebase';

import { Text } from 'react-native';
import { Form, Item, Label, Input, Button, CheckBox, Toast } from 'native-base';
import { InputMessage } from '../../components';
import { RulesModal } from '../../modals';

import renderInputIcon from '../../utils/renderInputIcon';
import { emailRegEx } from '../../utils/regEx';

import { fontColor, primaryContrastColor } from '../../themes/';

const CheckBoxWrapper = styled.View`
  flex-direction: row;
  margin: 20px 0;
`;

const CheckBoxText = styled.Text`
  color: ${fontColor};
  padding-left: 10px;
`;

const SubmitButton = styled(Button)`
  align-self: center;
  margin-top: 10px;
`;

const SubmitButtonText = styled.Text`
  color: ${primaryContrastColor};
`;

const labelStyle = { lineHeight: 13 };

const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputStatuses, setInputStatuses] = useState({});
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [rulesModalVisible, setRulesModalVisibility] = useState(false);

  const setInputStatus = params => {
    const { field, isValid, message } = params;

    setInputStatuses(prevStatuses => ({
      ...prevStatuses,
      [field]: {
        isValid,
        message
      }
    }));
  };

  const toggleRulesAccepted = () => {
    setRulesAccepted(prevValue => !prevValue);
  };

  const toggleRulesModalVisibility = () => {
    setRulesModalVisibility(prevValue => !prevValue);
  };

  getInputStatus = field => inputStatuses[field] && inputStatuses[field].isValid;

  getInputMessage = field => inputStatuses[field] && inputStatuses[field].message;

  const validateEmail = () => {
    if (!email) {
      return setInputStatus({ field: 'email', isValid: false, message: 'Proszę podać adres e-mail.' });
    }

    if (!emailRegEx.test(email)) {
      return setInputStatus({ field: 'email', isValid: false, message: 'Proszę podać poprawny adres e-mail.' });
    }

    setInputStatus({ field: 'email', isValid: true });
  };

  const validatePassword = () => {
    if (!password) {
      return setInputStatus({ field: 'password', isValid: false, message: 'Proszę podać hasło.' });
    }

    if (password.length < 8) {
      return setInputStatus({ field: 'password', isValid: false, message: 'Hasło powinno składać się z min. 8 znaków.' });
    }

    setInputStatus({ field: 'password', isValid: true });
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      return setInputStatus({ field: 'confirmPassword', isValid: false, message: 'Podane hasła różnią się.' });
    }

    return setInputStatus({ field: 'confirmPassword', isValid: true });
  };

  const validateForm = () => {  
    if (!email || !password || !confirmPassword || !rulesAccepted) {
      return false;
    }

    let isValid = true;

    Object.keys(inputStatuses).forEach(input => {
      if (!inputStatuses[input].isValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  const submit = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => {
        Toast.show({
          text: err.message || 'Błąd',
          buttonText: 'Zamknij',
          type: 'danger',
          duration: 2500
        });
      });

    Toast.show({
      text: 'Twoje konto zostało utworzone!',
      buttonText: 'Zamknij',
      type: 'success'
    });
  };

  const emailStatus = getInputStatus('email');
  const passwordStatus = getInputStatus('password');
  const confirmPasswordStatus = getInputStatus('confirmPassword');

  return (
    <>
      <RulesModal
        visible={rulesModalVisible}
        onClose={toggleRulesModalVisibility}
      />

      <Form>
        <Item
          success={emailStatus}
          error={emailStatus === false}
          floatingLabel
        >
          <Label style={labelStyle}>
            Adres e-mail
          </Label>
          <Input
            onChangeText={setEmail}
            onBlur={validateEmail}
            value={email}
          />
          {renderInputIcon(emailStatus)}
        </Item>
        <InputMessage message={getInputMessage('email')} />

        <Item
          success={passwordStatus}
          error={passwordStatus === false}
          floatingLabel
        >
          <Label style={labelStyle}>
            Hasło
          </Label>
          <Input
            onChangeText={setPassword}
            onBlur={validatePassword}
            value={password}
            secureTextEntry
          />
          {renderInputIcon(passwordStatus)}
        </Item>
        <InputMessage message={getInputMessage('password')} />

        <Item
          success={confirmPasswordStatus}
          error={confirmPasswordStatus === false}
          floatingLabel
          last
        >
          <Label style={labelStyle}>
            Potwierdź hasło
          </Label>
          <Input
            onChangeText={setConfirmPassword}
            onBlur={validateConfirmPassword}
            value={confirmPassword}
            secureTextEntry
          />
          {renderInputIcon(confirmPasswordStatus)}
        </Item>
        <InputMessage message={getInputMessage('confirmPassword')} />
      </Form>

      <CheckBoxWrapper>
        <CheckBox
          checked={rulesAccepted}
          onPress={toggleRulesAccepted}
          style={{ marginRight: 5 }}
        />
        <CheckBoxText>Akceptuję postanowienia <Text style={{ textDecorationLine: 'underline'}} onPress={toggleRulesModalVisibility}>regulaminu</Text>.</CheckBoxText>
      </CheckBoxWrapper>

      <SubmitButton
        onPress={submit}
        disabled={!validateForm()}
      >
        <SubmitButtonText>Zarejestruj się</SubmitButtonText>
      </SubmitButton>
    </>
  );
}

export default RegistrationScreen;