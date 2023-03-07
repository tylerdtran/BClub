import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../Firebase";
import { useNavigate } from "react-router-dom"; // needs to be simplified
import { GoogleButton } from "react-google-button";
import "./Login.css";

export default function SignInPage()
{
  // using the state variables to accept the input values for the signInWithEamilAndPassword
  // we pass a string inside the useState("") parameter 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // variable declaration for the google authentication provider

  // Simplify this code 
  // button navigation infrastructure 
  let navigate = useNavigate(); 
  const routeChange = (route) => { 
    let path = route; 
    navigate(path);
  }

  const signInUsingEmail = (e) => {
    // todo: sign in
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      console.log(userCredential);
      routeChange(`../`);
    })
    .catch((error) => { 
      console.log(error);
    })
  }

  // Signing in With Google 
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      routeChange(`../`);
    } catch (error) {
      console.log(error);
    }
  };


  // logout feature:
  /*
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  <button onClick={logout}>Logout</button>
  <div>
    {value?<Homepage/>:
    <GoogleButton onClick={handleClick}>Sign in With Google</GoogleButton>
    }
  </div>
  *//* Need to force the Login Page off the homepage  */
  // onClick={() => routeChange(`/SignUpPage`)}
  
    return(
      <div className="Login-Container"> 
        <form onSubmit={signInUsingEmail}>
          <h1>Welcome back, Bruin!</h1>
          <input className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <br/>
          <input className="loginInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <br/>
          <button type="submit" className="loginButton">Log In</button>
          <h2>Don't have an account?</h2>
          <button type="button" onClick={() => routeChange(`/SignUpPage`)}>Register for an Account</button>
          <GoogleButton onClick={GoogleLogin}> Sign in with Google </GoogleButton>
        </form>
      </div>
    );
}