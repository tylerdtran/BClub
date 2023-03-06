import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase";
import "./Login.css";

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
          <h1>Welcome home, Bruin!</h1>
          <input className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <br/>
          <input className="loginInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <br/>
          <button type="submit" className="loginButton">Register</button>
        </form>
      </div>
    );
}