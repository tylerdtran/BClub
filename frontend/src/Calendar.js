import './App.css';
import './Calendar.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import LearnMoreButton from './LearnMoreButton';
import { db } from "./Firebase";
import { ref, onChildAdded } from "firebase/database";
import Button from 'react-bootstrap/Button';

export default function Calendar() {
	const [unsortedEvents, setUnsortedEvents] = useState([]);

    useEffect(() => {
        const path = "/events/";
        const eventsRef = ref(db, path);
        
        onChildAdded(eventsRef, (data) => {
            setUnsortedEvents(prevLinks => [...prevLinks,
								   {title: data.val().title, 
								    description: data.val().description,
									start: data.val().start, 
									location: data.val().location,
									id: data.key}]);
        });
    }, []);

	const sortedEvents = [...unsortedEvents].sort((a, b) => {
		const dateA = new Date(a[2]);
		const dateB = new Date(b[2]);
		return dateA - dateB;
	});

	const removeDuplicates = (arr) => {
		const seen = new Set();
		return arr.filter((event) => {
		  if (seen.has(event.id)) {
			return false;
		  } else {
			seen.add(event.id);
			return true;
		  }
		});
	  };
    
	const filteredEvents = removeDuplicates(sortedEvents); 

	const tableRows = filteredEvents.map(event => {
		const formattedDate = moment(event.start).format('dddd, MMMM D');
		return (
			<tr key={event.id}>
				<td>{formattedDate}</td>
				<td>
					<h3>{event.title}</h3>
					<p>{event.location}</p>
					<p>{event.description}</p>
				</td>
			</tr>
		);
	});
    
	return (
		<>
			<div className='calendarMain'>
				<section className='eventsIntroSection'>
					<div className='eventsHeader'>
						<br></br>
						<h1>Events Coming Up!</h1>
						<p className='lineMoveUp'>_________</p>
						<p>UCLA Clubs, Events, & Activities</p>
						<br></br>
						<LearnMoreButton />
					</div>
				</section>

				<section className='eventsIntroSection'>
					<div className='eventsHeader2'>
						<br></br>
						<h1>1200+ </h1>
						<p>Recognized Student Groups</p>
						<br></br>
						<h1>125+ </h1>
						<p>Volunteer Events</p>
						<br></br>
						<h1>50000+ </h1>
						<p>Student Volunteers</p>
						<br></br>
						<h1>14+</h1>
						<p>Years of Volunteering Work</p>
						<br></br>
					</div>
				</section>

				<section>
					<div className="calendarMain">
						<br></br>
						<h2 className="eventsUpcoming">Upcoming Events</h2>
						<br></br>
						<br></br>
						<table>
							<tbody className="eventsUpcoming">
								{tableRows}
							</tbody>
						</table>
					</div>
					
				</section>
			</div>
			
			<Button className="submitButton" href="/addevents">
				Submit an event!
			</Button>

		</>
	);
}