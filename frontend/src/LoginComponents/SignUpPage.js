import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase";


export default function SignInPage()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    // todo: sign in
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      console.log(userCredential);
    })
    .catch((error) => { 
      console.log(error);
    })
  }

    return(
      <div className="Login-Container"> 
        <form onSubmit={signUp}>
          <h1>Create a New Account</h1>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
}