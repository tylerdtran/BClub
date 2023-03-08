import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';
import Catalog from './Catalog';
import Calendar from './Calendar';
import Feedback from './Feedback';
import Clubs from './Clubs';
import Profile from './Profile';
import NoPage from './NoPage';
import SignInPage from './LoginComponents/SignInPage';
import SignUpPage from './LoginComponents/SignUpPage';
import Highlights from './Highlights';
import HighlightsForm from './HighlightsForm';

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
					<Route path="myclubs" element={<Clubs/>} />
					<Route path="myprofile" element={<Profile/>} />
					<Route path="SignUpPage" element={<SignUpPage/>} />
					<Route path="SignInPage" element={<SignInPage/>} />
					<Route path="highlights" element={<Highlights/>} />
					<Route path="highlightsform" element={<HighlightsForm/>} />
					<Route path="*" element={<NoPage/>} />
				</Routes>
			</BrowserRouter>
			<Footer/>
		</>
	);
}