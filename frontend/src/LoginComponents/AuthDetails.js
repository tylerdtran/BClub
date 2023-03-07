import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    
    // ensures the user who is logged in remains logged in
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user)
            }
            else {
                setAuthUser(null)
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
        <div>{ authUser ? <><p>{`Signed In ${authUser.email}`}</p><button onClick={userSignOut}>Sign Out</button></> : <p>Signed Out</p>}</div>
    );
}

export default AuthDetails;