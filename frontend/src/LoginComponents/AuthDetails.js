import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    

     // Simplify this code 
    // button navigation infrastructure 
    let navigate = useNavigate(); 
    const routeChange = (route) => { 
        let path = route; 
        navigate(path);
    }


    // ensures the user who is logged in remains logged in
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user);
            }
            else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, [])
    // Accounts for user sign up 
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
        }).catch(error => console.log(error))
    }

    return (
        <div>{ authUser ? <><button onClick={userSignOut}> Welcome Bruin! | Log Out</button></> : <button onClick={() => routeChange(`/SignInPage`)}>Sign In</button>}</div>
    );
}

export default AuthDetails;