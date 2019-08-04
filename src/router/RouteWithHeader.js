import React from 'react';
import { Route } from 'react-router-native';

import { Header } from '../layout';

export default function RouteWithHeader({ component: Component, title, ...rest }) {
  return (
    <Route
      {...rest}
      render={matchProps => (
          <>
            <Header title={title} />
            <Component {...matchProps} />
          </>
      )}
    />
  );
}