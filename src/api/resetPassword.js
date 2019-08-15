import firebase from 'firebase';

export default function resetPassword({ email }) {
  return firebase.auth().sendPasswordResetEmail(email);
}