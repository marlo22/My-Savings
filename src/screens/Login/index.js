import React, { useState } from 'react';
import styled from 'styled-components';
import useRouter from 'use-react-router';
 
import { Container, Form, Item, Input, Button, Toast, CheckBox } from 'native-base';

import login from '../../api/login';

const CheckBoxWrapper = styled.View`
  flex-direction: row;
  margin-vertical: 10px;
`;

const RememberMeText = styled.Text`
  margin-left: 15px;
`;

const LoginActionsWrapper = styled.View`
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled(Button)`
  align-self: center;
`;

const LoginButtonText = styled.Text`
  color: #ffffff;
`;

const LoginActionsLink = styled.Text`
  margin-top: 5px;
`;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { history } = useRouter();

  const loginFn = () => login({
    email,
    password,
    remember: rememberMe,
    onError: err => Toast.show({
      text: err.message || 'Błąd',
      buttonText: 'Zamknij'
    })
  });

  return (
    <Container>
      <Form>
        <Item>
          <Input
            placeholder="Adres e-mail"
            onChangeText={({ text }) => setEmail(text)}
            value={email}
          />
        </Item>
        <Item last>
          <Input
            placeholder="Hasło"
            onChangeText={({ text }) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </Item>
      </Form>
      <CheckBoxWrapper>
        <CheckBox
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <RememberMeText>Zapamiętaj mnie</RememberMeText>
      </CheckBoxWrapper>
      <LoginActionsWrapper>
        <LoginButton onPress={loginFn}>
          <LoginButtonText>
            Zaloguj się
          </LoginButtonText>
        </LoginButton>
        <LoginActionsLink onPress={() => history.push('/register')}>Nie masz konta? Załóż je.</LoginActionsLink>
        <LoginActionsLink>Zapomniane hasło.</LoginActionsLink>
      </LoginActionsWrapper>
    </Container>
  );
}

export default LoginScreen;