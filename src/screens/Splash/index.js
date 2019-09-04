import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-native';

import { signIn } from '../../stores/actions/auth';

import { Loader } from '../../components';
import { LoginScreen } from '../';

import checkAuth from '../../api/checkAuth';

const SplashScreen = ({ signIn }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    checkAuth({
      onSuccess: userData => {
        signIn(userData);
        setIsLogged(true);
      },
      onFailed: () => setIsLogged(false),
      afterCheck: () => setAuthChecked(true)
    });
  }, []);

  if (!authChecked) {
    return <Loader message="Trwa uruchamianie aplikacji..." />;
  }

  return isLogged ? <Redirect to="/dashboard" /> : <LoginScreen />;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signIn
  }, dispatch);

SplashScreen.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);