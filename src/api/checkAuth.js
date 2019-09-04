import firebase from 'firebase';

export default function checkAuth({ onSuccess, onFailed, afterCheck }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onSuccess && onSuccess(user);
    } else {
      onFailed && onFailed();
    }

    afterCheck && afterCheck();
  });
}