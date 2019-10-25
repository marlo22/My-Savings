import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-native';

import { signIn } from '../../stores/actions/auth';
import { getUserSettings } from '../../stores/actions/userSettings';

import { Loader } from '../../components';
import { LoginScreen } from '../';

import { checkAuth } from '../../api';

const SplashScreen = () => {
  const dispatch = useDispatch();

  const [authChecked, setAuthChecked] = useState(false);
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    checkAuth({
      onSuccess: async userData => {
        await dispatch(signIn(userData));
        await dispatch(getUserSettings());
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

export default SplashScreen;