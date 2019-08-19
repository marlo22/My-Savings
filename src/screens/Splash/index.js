import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-native';

import { Loader } from '../../components';
import { LoginScreen } from '../';

import checkAuth from '../../api/checkAuth';

const SplashScreen = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    checkAuth({
      onSuccess: () => setIsLogged(true),
      onFailed: () => setIsLogged(false),
      afterCheck: () => setAuthChecked(true)
    })
  }, []);

  if (!authChecked) {
    return <Loader message="Trwa uruchamianie aplikacji..." />;
  }

  return isLogged ? <Redirect to="/dashboard" /> : <LoginScreen />;
};

export default SplashScreen;