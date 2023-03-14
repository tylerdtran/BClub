import './App.css';
import './Catalog.css';
import React from 'react';
import {
	MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple
} from 'mdb-react-ui-kit';

function Club({ clubName, clubBlurb, clubImage }) {
	return (
		<div className="clubListing">
			<p className="clubBlurb">
				<a href="#">
					{clubName}
				</a>
				<br />
				<br />
				{clubBlurb}
			</p>
			<img className="clubImage"
				src={clubImage}
				alt="Club Listing"
			/>
		</div>
	);
}

function Category({ category }) {
	return (
		<div>
			<h2>{ category }</h2>
			<section className="category">
				<Club clubName="Genshin Impact at UCLA"
				clubBlurb="The definitive community for Genshin Impact at UCLA!"
				clubImage="clubcatalogimages/genshin_club.webp"
				/>
				<Club clubName="Coming Soon"
				clubBlurb="Coming Soon"
				clubImage="placeholder.png"
				/>
				<Club clubName="Coming Soon"
				clubBlurb="Coming Soon"
				clubImage="placeholder.png"
				/>
				<Club clubName="Coming Soon"
				clubBlurb="Coming Soon"
				clubImage="placeholder.png"
				/>
			</section>
		</div>
	);
}

export default function Catalog() {
	return (
		<>
			<div className="catalogMain">
				<Category category="Featured" />
				<Category category="Educational" />
				<Category category="Resume Builders" />
				<Category category="Sports" />
				<Category category="Cultural" />
			</div>
		</>
	);
}

// export function App() {
// 	return (
// 	  <MDBCard>
// 		<MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
// 		  <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
// 		  <a>
// 			<div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
// 		  </a>
// 		</MDBRipple>
// 		<MDBCardBody>
// 		  <MDBCardTitle>Card title</MDBCardTitle>
// 		  <MDBCardText>
// 			Some quick example text to build on the card title and make up the bulk of the card's content.
// 		  </MDBCardText>
// 		  <MDBBtn href='#'>Button</MDBBtn>
// 		</MDBCardBody>
// 	  </MDBCard>
// 	);
//   }


// function Category({ category }) {
// 	return (
// 		<div>
// 			<h2>{category}</h2>
// 			<MDBCard>
// 				<MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
// 					<MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
// 					<a>
// 						<div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
// 					</a>
// 				</MDBRipple>
// 				<MDBCardBody>
// 					<MDBCardTitle>Card title</MDBCardTitle>
// 					<MDBCardText>
// 						Some quick example text to build on the card title and make up the bulk of the card's content.
// 					</MDBCardText>
// 					<MDBBtn href='#'>Button</MDBBtn>
// 				</MDBCardBody>
// 			</MDBCard>
// 		</div>
// 	);
// }