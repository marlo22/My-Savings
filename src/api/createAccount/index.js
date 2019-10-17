import { firebase } from '../';

export default function createAccount({ email, password }) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}