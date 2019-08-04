import React from 'react';
import { Root, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './src/themes/default';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { RouteWithHeader } from './src/router';

import { SplashScreen, RegistrationScreen } from './src/screens';

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
              {/* <RouteWithHeader
                exact
                path="/remind-password"
                component={SplashScreen}
              /> */}
            </Switch>
          </ThemeProvider>
        </Root>
      </StyleProvider>
    </NativeRouter>
  );
};

export default App;
