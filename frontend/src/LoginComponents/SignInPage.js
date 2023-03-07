import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../Firebase";
import { useNavigate } from "react-router-dom"; // needs to be simplified
// import { GoogleButton } from "react-google-button";
// import Homepage from '../Homepage';
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
  const routeChange = () =>{ 
    let path = `/SignUpPage`; 
    navigate(path);
  }

  const signIn = (e) => {
    // todo: sign in
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      console.log(userCredential);
    })
    .catch((error) => { 
      console.log(error);
    })
  }
  // Google Authentication 
  // const [value, setValue] = useState('');
  // const handleClick = () => {
  //   signInWithPopup(auth, provider).then((data)=>{
  //       setValue(data.user.email)
  //       localStorage.setItem("email", data.user.email)
  //   })

  // }
  // useEffect(()=>{
  //   setValue(localStorage.getItem('email'))
  // })

  // sign in w/ popup 
  // signInWithPopup(auth, provider)
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   // IdP data available using getAdditionalUserInfo(result)
  //   // ...
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });

  /* Sign In with only one email: */
  /* 
    // Step 1.
  // User tries to sign in to Google.
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error) {
    // An error happened.
    if (error.code === 'auth/account-exists-with-different-credential') {
      // Step 2.
      // User's email already exists.
      // The pending Google credential.
      var pendingCred = error.credential;
      // The provider account's email address.
      var email = error.email;
      // Get sign-in methods for this email.
      auth.fetchSignInMethodsForEmail(email).then(function(methods) {
        // Step 3.
        // If the user has several sign-in methods,
        // the first method in the list will be the "recommended" method to use.
        if (methods[0] === 'password') {
          // Asks the user their password.
          // In real scenario, you should handle this asynchronously.
          var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
          auth.signInWithEmailAndPassword(email, password).then(function(result) {
            // Step 4a.
            return result.user.linkWithCredential(pendingCred);
          }).then(function() {
            // Google account successfully linked to the existing Firebase user.
            goToApp();
          });
          return;
        }
        // All the other cases are external providers.
        // Construct provider object for that provider.
        // TODO: implement getProviderForProviderId.
        var provider = getProviderForProviderId(methods[0]);
        // At this point, you should let the user know that they already have an account
        // but with a different provider, and let them validate the fact they want to
        // sign in with this provider.
        // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        // so in real scenario you should ask the user to click on a "continue" button
        // that will trigger the signInWithPopup.
        auth.signInWithPopup(provider).then(function(result) {
          // Remember that the user may have signed in with an account that has a different email
          // address than the first one. This can happen as Firebase doesn't control the provider's
          // sign in flow and the user is free to login using whichever account they own.
          // Step 4b.
          // Link to Google credential.
          // As we have access to the pending credential, we can directly call the link method.
          result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
            // Google account successfully linked to the existing Firebase user.
            goToApp();
          });
        });
      });
    }
  });
  */

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
  
    return(
      <div className="Login-Container"> 
        <form onSubmit={signIn}>
          <h1>Welcome back, Bruin!</h1>
          <input className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <br/>
          <input className="loginInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <br/>
          <button type="submit" className="loginButton">Log In</button>
          <h2>Don't have an account?</h2>
          <button type="button" onClick={routeChange}>Register for an Account</button>
        </form>
      </div>
    );
}