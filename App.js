import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import authReducer from './src/stores/reducers/auth';

import { Root, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './src/themes/default';

import { NativeRouter, Route, Switch } from 'react-router-native';
import { RouteWithHeader } from './src/router';

import GlobalContext, { GlobalContextProvider } from './src/context/Global';

import { IntlProvider } from 'react-intl';
import messages from './src/translations';

import {
  SplashScreen,
  RegistrationScreen,
  ResetPasswordScreen,
  DashboardScreen
} from './src/screens';

import { NavMenu } from './src/components';

const store = createStore(authReducer);

const App = () => {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <GlobalContext.Consumer>
          {({ language }) => (
            <IntlProvider messages={messages[language]} locale={language}>
              <NativeRouter>
                <StyleProvider style={getTheme(platform)}>
                  <Root>
                    <ThemeProvider theme={defaultTheme}>
                      <Switch>
                        <Route exact path="/" component={SplashScreen} />
                        <RouteWithHeader
                          exact
                          title="Zarejestruj się"
                          hasNavMenu={false}
                          path="/register"
                          component={RegistrationScreen}
                        />
                        <RouteWithHeader
                          exact
                          title="Resetuj hasło"
                          hasNavMenu={false}
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
                    <NavMenu />
                  </Root>
                </StyleProvider>
              </NativeRouter>
            </IntlProvider>
          )}
        </GlobalContext.Consumer>
      </GlobalContextProvider>
    </Provider>
  );
};

export default App;
