// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import './App.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-8vR9blff5GIhVhlMH8LMu48_U5-91ic",
  authDomain: "bclub-b0d3f.firebaseapp.com",
  projectId: "bclub-b0d3f",
  storageBucket: "bclub-b0d3f.appspot.com",
  messagingSenderId: "555735926398",
  appId: "1:555735926398:web:38b9a5029a02c4a8d9fa2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getDatabase(app);
