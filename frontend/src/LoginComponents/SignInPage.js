import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom"; // needs to be simplified
import { Toast, ToastContainer } from 'react-bootstrap';
import "./Login.css";

export default function SignInPage()
{
  // using the state variables to accept the input values for the signInWithEamilAndPassword
  // we pass a string inside the useState("") parameter 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPopUp, setIsValidPopUp] = useState(false);
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
      setIsValidPopUp(false);
    })
    .catch((error) => { 
      console.log(error);
      setIsValidPopUp(true);
    })
  }
  
    return(
      <div className="Login-Container"> 
      <ToastContainer className="p-3" position="top-center">
						<Toast onClose={() => setIsValidPopUp(false)} show={isValidPopUp} delay={3000} autohide bg="light">
							<Toast.Body>Invalid Username or Password: Your email address has either already been used, your login is invalid or you need to create a new account</Toast.Body>
						</Toast>
			</ToastContainer> 
        <form onSubmit={signInUsingEmail}>
          <h1 className="welcomeMessage">Welcome back, Bruin!</h1>
          <input className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <br/>
          <input className="loginInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <br/>
          <button type="submit" className="bigButton">Sign In</button>
          <h2 className="noAccount">Don't have an account?</h2>
          <button type="button" className="bigButton" onClick={() => routeChange(`/SignUpPage`)}>Register</button>
        </form>
      </div>
    );
}