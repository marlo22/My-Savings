import React, { useState, useEffect } from 'react';

import { Button } from 'react-native';
import { Loader } from '../../components';
import { LoginScreen } from '../';

import checkAuth from '../../api/checkAuth';
import firebase from '../../api/firebase';

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

  return isLogged ? <Button onPress={() => firebase.auth().signOut()} title="Zalogowano! Wyloguj." /> : <LoginScreen />;
};

export default SplashScreen;