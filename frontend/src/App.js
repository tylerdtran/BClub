import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';
import Catalog from './IndividualPage/Catalog';
import Calendar from './Calendar';
import Feedback from './Feedback';
import Profile from './IndividualPage/Profile';
import NoPage from './NoPage';
import SignInPage from './LoginComponents/SignInPage';
import SignUpPage from './LoginComponents/SignUpPage';
import Highlights from './Highlights';
import HighlightsForm from './HighlightsForm';
import ClubsForm from './ClubsForm';
import { EditReview } from './Components/EditReview';
import { ReviewDisplay } from './Components/ReviewDisplay';
// import WriteReview from '../Components/WriteReview';
import { ProtectedRoute } from './Components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.css';

import GoogleCalendar from './GoogleCalendar';

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
					<Route path="Profile" element={<Profile/>} />
					<Route path="SignUpPage" element={<SignUpPage/>} />
					<Route path="SignInPage" element={<SignInPage/>} />
					<Route path="editReview" element={<ProtectedRoute state={{ next: '/editReview' }} />}>
						<Route index element={<EditReview />} />
					</Route> 
					<Route path="ReviewDisplay" element={<ReviewDisplay/>} />
					<Route path="clubs/:clubname" element={<ReviewDisplay />} />
					<Route path="highlights" element={<Highlights/>} />
					<Route path="highlightsform" element={<HighlightsForm/>} />
					<Route path="clubsform" element={<ClubsForm/>} />
					<Route path="addevents" element={<GoogleCalendar/>} />
					<Route path="*" element={<NoPage/>} />
				</Routes>
			</BrowserRouter>
			<Footer/>
		</>
	);
}