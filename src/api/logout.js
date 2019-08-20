import firebase from './firebase';

export default function logout({ push }) {
  return new Promise(async (resolve, reject) => {
    try {
      await firebase.auth().signOut();

      if (push) {
        push('/');
      }

      resolve();
    } catch(err) {
      reject(err);
    }
  })
}