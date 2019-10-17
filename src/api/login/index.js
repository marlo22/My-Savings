import firebase from 'firebase';

export default async function login({ email, password, remember = true, onSuccess, onError }) {
  try {
    if (!email || !password) {
      throw new Error('Email and password must be defined!');
    }

    if (!remember) {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
    await firebase.auth().signInWithEmailAndPassword(email, password);

    onSuccess && onSuccess();
  } catch (err) {
    onError && onError(err);
  }
};