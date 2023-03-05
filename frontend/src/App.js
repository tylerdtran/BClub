import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';
import Catalog from './Catalog';
import Calendar from './Calendar';
import Feedback from './Feedback';
import Account from './Account';
import Clubs from './Clubs';
import Profile from './Profile';
import SignUp from './SignUp';
import NoPage from './NoPage';
import SignInPage from './LoginComponents/SignInPage';
import SignUpPage from './LoginComponents/SignUpPage';

export default function App(){
	return (
		<>
			<BrowserRouter>
			<Header/>
				<Routes>
					<Route path="/" element={<Homepage/>} />
					<Route index element={<Homepage/>} />
					<Route path="catalog" element={<Catalog/>} />
					<Route path="calendar" element={<Calendar/>} />
					<Route path="feedback" element={<Feedback/>} />
					<Route path="account" element={<Account/>} />
					<Route path="myclubs" element={<Clubs/>} />
					<Route path="myprofile" element={<Profile/>} />
					<Route path="SignUpPage" element={<SignUpPage/>} />
					<Route path="SignInPage" element={<SignInPage/>} />
					<Route path="AuthDetails" element={<AuthDetails/>} />
					<Route path="*" element={<NoPage/>} />
				</Routes>
			</BrowserRouter>
			<Footer/>
		</>
	);
}