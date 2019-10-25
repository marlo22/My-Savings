import React from 'react';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './src/stores/reducers/auth';
import categoriesReducer from './src/stores/reducers/categories';
import spendingsReducer from './src/stores/reducers/spendings';
import userSettingsReducer from './src/stores/reducers/userSettings';

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
  DashboardScreen,
  CategoriesScreen,
  SettingsScreen,
  SpendingsScreen
} from './src/screens';

import { NavMenu } from './src/components';

const reducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  spendings: spendingsReducer,
  userSettings: userSettingsReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

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
                        <RouteWithHeader
                          exact
                          title="Kategorie"
                          path="/categories"
                          component={CategoriesScreen}
                        />
                        <RouteWithHeader
                          exact
                          title="Wydatki"
                          path="/spendings"
                          component={SpendingsScreen}
                        />
                        <RouteWithHeader
                          exact
                          title="Ustawienia"
                          path="/settings"
                          component={SettingsScreen}
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
