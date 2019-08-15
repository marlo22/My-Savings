import firebase from 'firebase';

export default function resetPassword(params) {
  const { email } = params;

  return firebase.auth().sendPasswordResetEmail(email);
}