
  import firebase from 'firebase';



  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBG5zn0hNABa9FL1lskZH1ac1JogebNdjQ",
    authDomain: "todo-app-f09e0.firebaseapp.com",
    databaseURL: "https://todo-app-f09e0.firebaseio.com",
    projectId: "todo-app-f09e0",
    storageBucket: "todo-app-f09e0.appspot.com",
    messagingSenderId: "1057616186869",
    appId: "1:1057616186869:web:8e968cdc042f060aa464bc",
    measurementId: "G-K6PQXTJDE0"
  })

  const db = firebaseApp.firestore();
  


  export default db;