import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCE7ynOIHs9P9s2mvZlddUPKQkuZfziowc",
    authDomain: "popat-46d62.firebaseapp.com",
    databaseURL: "https://popat-46d62.firebaseio.com",
    projectId: "popat-46d62",
    storageBucket: "popat-46d62.appspot.com",
    messagingSenderId: "355066104861",
    appId: "1:355066104861:web:9a8a02b8726772a99dcaf4",
    measurementId: "G-WFN5GCSGR3"
  };

export const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
export const auth = app.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default db;