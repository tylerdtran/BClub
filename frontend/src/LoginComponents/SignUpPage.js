import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom"; 
import { Form, Toast, ToastContainer } from 'react-bootstrap';
import "./Login.css";

export default function SignUpPage()
{ 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isValidPopUp, setIsValidPopUp] = useState(false);

  const start = 1950;
  const end = 2027;
  let classes = [...Array(end - start + 1).keys()].map(x => x + start);
  classes.reverse();

  // Simplify this code 
  // button navigation infrastructure 
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Profile`; 
    navigate(path);
  }

  /* use the setFirstName and setLastName functions */

  const signUp = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      console.log(userCredential);
      routeChange();
      setIsValidPopUp(false);
    })
    .catch((error) => { 
      console.log(error);
      setIsValidPopUp(true);
    })
  }
  setValidated(true);
}

  return(
    <div className="Login-Container"> 
      <ToastContainer className="p-3" position="top-center">
						<Toast onClose={() => setIsValidPopUp(false)} show={isValidPopUp} delay={3000} autohide bg="light">
							<Toast.Body>Invalid Username or Password: Your email address has either already been used or your login is invalid</Toast.Body>
						</Toast>
			</ToastContainer> 
      <Form validated={validated} onSubmit={signUp}>
        <h1 className="welcomeMessage">Welcome home, Bruin!</h1>
        <input className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br/>
        <input className="loginInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <br/>
        <button type="submit" className="bigButton">Register</button>
      </Form>
    </div>
  );
}