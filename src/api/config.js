import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTqbPfpZaZaKF422mM6O3yXbPN2M5CTFg",
  authDomain: "tcl-64-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-64-smart-shopping-list",
  storageBucket: "tcl-64-smart-shopping-list.appspot.com",
  messagingSenderId: "862466739490",
  appId: "1:862466739490:web:edc754a882d208370fe97b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
