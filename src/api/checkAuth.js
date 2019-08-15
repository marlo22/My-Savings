import firebase from 'firebase';

export default function checkAuth({ onSuccess, onFailed, afterCheck }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onSuccess && onSuccess();
    } else {
      onFailed && onFailed();
    }

    afterCheck && afterCheck();
  });
}