import firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCUhg-_flQWpxWXuXv4Z_QvFkqC3yJyOQE",
  authDomain: "whatsaapp-clone-376db.firebaseapp.com",
  projectId: "whatsaapp-clone-376db",
  storageBucket: "whatsaapp-clone-376db.appspot.com",
  messagingSenderId: "129794521445",
  appId: "1:129794521445:web:d74f58da5c5e53d4ff498c",
  measurementId: "G-50CFM1B7C5"
};
const firebaseApp=firebase.initializeApp(firebaseConfig);;
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;