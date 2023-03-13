import './App.css';
import './Calendar.css';
import moment from 'moment';
import events from './events';
import React from 'react';
import LearnMoreButton from './LearnMoreButton';

export default function Calendar() {

	// group the events by date
	const eventsByDate = events.reduce((acc, event) => {
		const date = moment(event.date).format('YYYY-MM-DD');
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(event);
		return acc;
	}, {});

	// generate an array of table rows for each date with events
	const tableRows = Object.keys(eventsByDate).map(date => {
		const eventsForDate = eventsByDate[date];
		const formattedDate = moment(date).format('dddd, MMMM D');
		const eventList = eventsForDate.map(event => (
			<li key={event.id} className="event-item">
				<h3>{event.title}</h3>
				<p>{event.time}</p>
				<p>{event.location}</p>
				<p className='event-description'>{event.description}</p>
			</li>
		));
		return (
			<tr key={date}>
				<td>{formattedDate}</td>
				<td>
					<ul className="event-list">
						{eventList}
					</ul>
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
		</>
	);
}
