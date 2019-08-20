import firebase from './firebase';

export default function logout() {
  return firebase.auth().signOut();
}