// src/firebase.js
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBjf9ELcSp704nKHR4EZGyrGicGIgC3Mpw",
  authDomain: "picturewords-2ce8b.firebaseapp.com",
  databaseURL: "https://picturewords-2ce8b.firebaseio.com",
  projectId: "picturewords-2ce8b",
  storageBucket: "picturewords-2ce8b.appspot.com",
  messagingSenderId: "91232156206"
};

firebase.initializeApp(config);

export default firebase;