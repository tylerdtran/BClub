import './App.css';
import './Catalog.css';
import React, { useState } from 'react';

// href
function Club({ clubName, clubBlurb, clubImage}) {
	return (
		<div className="clubListing">
			<p className="clubBlurb">
				<a href="#">
					{ clubName }
				</a>
				<br/>
				<br/>
				{ clubBlurb }
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

export default function Catalog(){
	return(
		<>
			<div className="catalogMain">
				<Category category="Featured"/>
				<Category category="Educational"/>
				<Category category="Resume Builders"/>
				<Category category="Sports"/>
				<Category category="Cultural"/>
			</div>
		</>
	);
}