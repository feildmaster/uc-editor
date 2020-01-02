if (!window.firebase) throw new Error('Firebase not loaded');

const config = {
  apiKey: "AIzaSyDzqnhPQs_gyy2Vd4nfbnYo7mUJ2K_N5A8",
  authDomain: "undercard.feildmaster.com",
  databaseURL: "https://undercard-509ba.firebaseio.com",
  storageBucket: "undercard-509ba.appspot.com",
  messagingSenderId: "962891534231",
  projectId: "undercard-509ba"
};

let app;

export default function get() {
  if (!app) app = firebase.initializeApp(config);
  return app;
};

export function getUser() {
  return get().auth().currentUser;
}
