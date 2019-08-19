import React from 'react';
import { Root, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './src/themes/default';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { RouteWithHeader } from './src/router';

import {
  SplashScreen,
  RegistrationScreen,
  ResetPasswordScreen,
  DashboardScreen
} from './src/screens';

const App = () => {
  return (
    <NativeRouter>
      <StyleProvider style={getTheme(platform)}>
        <Root>
          <ThemeProvider theme={defaultTheme}>
            <Switch>
              <Route exact path="/" component={SplashScreen} />
              <RouteWithHeader
                exact
                title="Zarejestruj się"
                path="/register"
                component={RegistrationScreen}
              />
              <RouteWithHeader
                exact
                title="Resetuj hasło"
                path="/reset-password"
                component={ResetPasswordScreen}
              />
              <RouteWithHeader
                exact
                title="MySavings"
                path="/dashboard"
                component={DashboardScreen}
              />
            </Switch>
          </ThemeProvider>
        </Root>
      </StyleProvider>
    </NativeRouter>
  );
};

export default App;
