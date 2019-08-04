import firebase from 'firebase';

export default function checkAuth(params) {
  const { onSuccess, onFailed, afterCheck } = params;

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onSuccess && onSuccess();
    } else {
      onFailed && onFailed();
    }

    afterCheck && afterCheck();
  });
}