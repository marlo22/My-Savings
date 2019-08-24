import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-native';

import { Header } from '../layout';

export default function RouteWithHeader({ component: Component, title, hasNavMenu, ...rest }) {
  return (
    <Route
      {...rest}
      render={matchProps => (
          <>
            <Header title={title} hasNavMenu={hasNavMenu} />
            <Component {...matchProps} />
          </>
      )}
    />
  );
};

RouteWithHeader.defaultProps = {
  hasNavMenu: true
};

RouteWithHeader.propTypes = {
  component: PropTypes.node.isRequired,
  title: PropTypes.string,
  hasNavMenu: PropTypes.bool.isRequired
};