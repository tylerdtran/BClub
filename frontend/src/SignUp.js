import './App.css';
import React from 'react';

export default function SignUp() {
    return (
        <div>
            <h1> Sign Up Page</h1>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required></input>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required></input>
            <input type="submit" value="Sign Up"></input>
        </div>
    );
}