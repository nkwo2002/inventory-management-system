import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBhXsseEwTah6QLLw9YStp7J5nEvqbV0mM",
  authDomain: "inventory-5b455.firebaseapp.com",
  projectId: "inventory-5b455",
  storageBucket: "inventory-5b455.appspot.com",
  messagingSenderId: "890258285442",
  appId: "1:890258285442:web:9903fb6512e05cc90ca59b",
  measurementId: "G-MH6YQNKGG9"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export default firebaseConfig;