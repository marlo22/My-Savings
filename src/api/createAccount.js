import firebase from './firebase';

export default function createAccount({ email, password }) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}