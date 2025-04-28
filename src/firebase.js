import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5oZq15X1qkkEaBlc56nyHNNgQojYmz7g",
  authDomain: "personaswap-app.firebaseapp.com",
  projectId: "personaswap-app",
  storageBucket: "personaswap-app.firebasestorage.app",
  messagingSenderId: "972422854708",
  appId: "1:972422854708:web:c4ad6d0dc48cd8474c3261",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
