import './App.css';
import React from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

export function searchBar() {
	return (
		<MDBInputGroup>
			<MDBInput label='Search' size='lg' style={{ width: '642%', height: '50px', position: 'relative', }} />
			<MDBBtn rippleColor='dark' style={{ width: '4.4%', height: '50px', position: 'relative', bottom: '6px', display: 'inline-flex', left: '1510px' }}>
				<MDBIcon icon='search' size='lg' style={{ position: 'relative', top: '5px', left: '5px' }} />
			</MDBBtn>
		</MDBInputGroup>

	);
}

export default function Homepage() {
	return (
		<>
			<div id='searchBarWrapper'>
				{searchBar()}
			</div>
			<hr
				style={{
					background: "#2D68C4",
					height: "5px",
					float: 'left',
					border: "none",
					width: '100%'
				}}
			/>
			<main>
				<section className="featureSection">
					<h2>Club Spotlight</h2>
					<h3>
						Genshin Impact at UCLA
					</h3>
					<div className="featurePhoto">
						<figcaption>Genshin Theme Song Jeopardy Event - February 7, 2023</figcaption>
						<img src="featuredevent.jpg" alt="Featured Event" />
					</div>
					<p>
						With an active community of over 400 UCLA students and alumni, Genshin
						Impact at UCLA is the place to be to connect with your fellow
						Travelers! Featuring a Discord server with hundreds of daily messages
						and frequent social events, including weekly picnics, there's always people to meet and fun to
						be had!
						<br />
						<br />
						<a href="https://discord.gg/FpvRw77U9d">Join us on Discord!</a>
						<br />
						<br />
						<a href="http://localhost:3000">View this club's page on BClub</a>
					</p>
				</section>
				<aside className="APIs">
					<div className="eventSection">
						<h2>Upcoming Events</h2>
						<h3>Place Google Calendar API here</h3>
					</div>
					<div className="photoSection">
						<h2>Photos</h2>
						<h3>Place Instagram API here</h3>
					</div>
				</aside>
			</main>
		</>
	);
}