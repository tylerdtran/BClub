import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../Firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom"; // needs to be simplified

import "./Login.css";

export default function SignUpPage()
{ 
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classYear, setClassYear] = useState("");
  const [validated, setValidated] = useState(false);
  const start = 1950;
  const end = 2030;
  let classes = [...Array(end - start + 1).keys()].map(x => x + start);
  classes.reverse();

  // Simplify this code 
  // button navigation infrastructure 
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `../`; 
    navigate(path);
  }

  /* use the setFirstName and setLastName functions */

  const signUp = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
    // todo: sign in
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      console.log(userCredential);
      const userId = auth.currentUser.uid
      writeUserData(userId, displayName, email, classYear)
      routeChange();
    })
    .catch((error) => { 
      console.log(error);
    })
  }
  setValidated(true);
}

  // writes the user data to the database 
  function writeUserData(userId, displayName, email, classYear) {
    set(ref(db, 'users-profile/' + userId), {
      display_name: displayName, 
      email: email,
      class_year: classYear
    });
  }

  return(
    <div className="Login-Container"> 
      <form validated={validated} onSubmit={signUp}>
        <h1>Welcome home, Bruin!</h1>
        <input className="loginInput" type="first-name" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}></input>
        <br/>
        <input className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br/>
        <input className="loginInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <br/>
        <select className="loginInput" onChange={(e) => { setClassYear(e.target.value) }}>
                <option value="">Select your class year...</option>
                {classes.map((x) => (
                  <option value={x}>{x}</option>
                ))}
        </select>
        <br/>
        <button type="submit" className="bigButton">Register</button>
      </form>
    </div>
  );
}