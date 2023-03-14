import './App.css';
import './Calendar.css';
import React from 'react';
import LearnMoreButton from './LearnMoreButton';


export default function Calendar(){
	return(
		<>
			<div className='calendarMain'>
				<section className='eventsIntroSection'>
					<div className='eventsHeader'>
						<h1>Get Involved!</h1>
						<p className='lineMoveUp'>_________</p>
						<p>UCLA Clubs & Activities</p>
						<LearnMoreButton />
					</div>
				</section>
    
				<section className='eventsIntroSection'> 
					<div className='eventsHeader2'>
						<h1>1200+ </h1>
						<p>Recognized Student Groups  </p>
						<h1>125+ </h1>
						<p>Volunteer Events  </p>
						<h1>125+ </h1>
						<p>Student Volunteers  </p>
						<h1>50000+  </h1>
						<p>Years of Volunteering Work</p>
						<p>14+</p>
					</div>

				</section>
			</div>
		</>
	);
}