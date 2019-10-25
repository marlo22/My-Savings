import firebase from 'firebase';

export default function checkAuth({ onSuccess, onFailed, afterCheck }) {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      onSuccess && await onSuccess(user);
    } else {
      onFailed && await onFailed();
    }

    afterCheck && afterCheck();
  });
}