// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUVZGe4PsAe0XnfsNbYeTxvKAJGY3tBCY",
  authDomain: "planner-viola-9b2ab.firebaseapp.com",
  projectId: "planner-viola-9b2ab",
  storageBucket: "planner-viola-9b2ab.firebasestorage.app",
  messagingSenderId: "374576310971",
  appId: "1:374576310971:web:b89af917f19aa40624179e",
  measurementId: "G-7H5X65CFS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
