// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider } from "firebase/auth"; 
import { getDatabase } from "firebase/database";
import './App.css';

const express = require('express')
const app = express()
const port = 8080
require('dotenv').config()

const secret_key = process.env.APIKEY
console.log(secret_key)

app.get('/test/endpoint', (req, res) => {
  const { api_key } = req.query
  const message = `API KEY is ${api_key}`
  console.log(message)

  if (api_key != secret_key) {
    return res.status(403).send({message: `Your API KEY was incorrect: ${api_key}`})
  }
  res.status(200).send({ message })
})

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: secret_key,
  authDomain: "bclub-b0d3f.firebaseapp.com",
  projectId: "bclub-b0d3f",
  storageBucket: "bclub-b0d3f.appspot.com",
  messagingSenderId: "555735926398",
  appId: "1:555735926398:web:38b9a5029a02c4a8d9fa2f",
};

// Initialize Firebase
const application = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(application);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar.events.readonly");
const db = getDatabase();
const storage = getStorage();
export { auth, provider, db, storage }
 

