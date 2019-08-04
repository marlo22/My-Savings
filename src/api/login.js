import firebase from 'firebase';

export default async function login(params) {
  const { email, password, remember = true, onSuccess, onError } = params;

  try {
    if (!remember) {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
    await firebase.auth().signInWithEmailAndPassword(email, password);

    onSuccess && onSuccess();
  } catch(err) {
    onError && onError(err);
  }
};