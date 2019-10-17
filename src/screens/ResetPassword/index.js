import React, { useState } from 'react';
import styled from 'styled-components';

import { Form, Item, Label, Input, Button, Toast } from 'native-base';

import { resetPassword as firebaseResetPassword } from '../../api';

import renderInputIcon from '../../utils/renderInputIcon';
import { emailRegEx } from '../../utils/regEx';

import { primaryContrastColor } from '../../themes/';

const InstructionText = styled.Text`
  padding: 5px 10px;
`;

const SubmitButton = styled(Button)`
  align-self: center;
  margin-top: 10px;
`;

const SubmitButtonText = styled.Text`
  color: ${primaryContrastColor};
`;

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(null);

  const validateEmail = emailValue => {
    let isValid = true;

    if (!emailValue) {
      isValid = false;
    }

    if (!emailRegEx.test(emailValue)) {
      isValid = false;
    }

    setEmailIsValid(isValid);
  };

  const handleEmailChange = value => {
    setEmail(value);
    validateEmail(value);
  }

  const resetPassword = async () => {
    if (!emailIsValid) return;

    try {
      await firebaseResetPassword({ email });

      Toast.show({
        text: 'Wiadomość została wysłana!',
        buttonText: 'Zamknij',
        type: 'success'
      });
    } catch(err) {
      Toast.show({
        text: err.message || 'Błąd',
        buttonText: 'Zamknij',
        type: 'danger',
        duration: 2500
      });
    }
  }

  return (
    <>
      <InstructionText>
        Aby zresetować hasło wpisz e-mail z którym powiązane jest Twoje konto.
        Na podany adres zostanie wysłana wiadomość z dalszymi instrukcjami.
      </InstructionText>

      <Form>
        <Item
          success={emailIsValid}
          error={emailIsValid === false}
          floatingLabel
        >
          <Label>
            Adres e-mail
          </Label>
          <Input
            onChangeText={handleEmailChange}
            value={email}
          />
          {renderInputIcon(emailIsValid)}
        </Item>
      </Form>

      <SubmitButton
        onPress={resetPassword}
        disabled={!emailIsValid}
      >
        <SubmitButtonText>Resetuj hasło</SubmitButtonText>
      </SubmitButton>
    </>
  )
};

export default ResetPasswordScreen;