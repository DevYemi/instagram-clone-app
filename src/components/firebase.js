import firebase from 'firebase'

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyAyC-qP5gEHWZj1ezHgoSZ_4TJ-8v7ApqQ",
    authDomain: "instagram-react-clone-9e285.firebaseapp.com",
    databaseURL: "https://instagram-react-clone-9e285.firebaseio.com",
    projectId: "instagram-react-clone-9e285",
    storageBucket: "instagram-react-clone-9e285.appspot.com",
    messagingSenderId: "905567958710",
    appId: "1:905567958710:web:c9904c6db09d9c16029817",
    measurementId: "G-PJGQZZNFSY"
  }
)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}
