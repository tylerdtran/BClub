import './App.css';
import React from 'react';
// import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import Slides from './slideshow';
import { HomePageSearchBar } from './Components/HomePageSearchBar';

// export function searchBar() {
// 	return (
// 		<MDBInputGroup>
// 			<MDBInput placeholder="Search" className="searchBar"/>
// 			<MDBBtn rippleColor='dark' className="searchBtn">
// 				<MDBIcon icon='search'/>
// 			</MDBBtn>
// 		</MDBInputGroup>
// 	);
// }

export default function Homepage() {
	return (
		<>
			<div id='searchBarWrapper'>
				<HomePageSearchBar nav={"redirect"} />
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
				<p id='weeklyFeatured'>Weekly Featured Clubs</p>
				<Slides></Slides>
				<br></br>
				<br></br>
				</section>
			
			</main>
		</>
	);
}