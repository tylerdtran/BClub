import './App.css';
import './Catalog.css';
import React from 'react';
// import {
//     MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple
// } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Catalog() {
    const categories = [
      {
        name: "Featured",
        clubs: [
          {
            clubName: "Genshin Impact at UCLA",
            clubBlurb: "The definitive community for Genshin Impact at UCLA!",
            clubImage: "clubcatalogimages/genshin_club.webp",
          },
          {
            clubName: "Bruin Club Tennis",
            clubBlurb: "The best club ever!",
            clubImage: "clubcatalogimages/BruinClubTennis.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
        ],
      },
      {
        name: "Educational",
        clubs: [
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
		  {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
        ],
      },
      {
        name: "Resume Builders",
        clubs: [
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
		  {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
        ],
      },
	  {
        name: "Sports",
        clubs: [
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
		  {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
		],
	},
	{
        name: "Cultural",
        clubs: [
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
		  {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: "Coming Soon",
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
		],
	},
    ];
  
    return (
      <div className="catalogContainer">
        <h1 className='centeredCategoryTitle'>Club Catalog</h1>
        {categories.map((category) => (
          <div className='categoryCenter' key={category.name}>
            <h2>{category.name}</h2>
            <Category clubs={category.clubs}></Category> 
          </div>
        ))}
      </div>
    );
  }

function Category({ category, clubs }) {
    return (
      <div>
        <section className="category">
          <div className="empty-grid-item"></div> {/* Add empty grid item */}
          {clubs.map((club) => (
            <Card key={club.clubName} href="clubs/Bruin-Club-Tennis">
                <Card.Img src={club.clubImage} fluid alt='Club Image' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              <Card.Body>
                <Card.Title>{club.clubName}</Card.Title>
                <Card.Text>{club.clubBlurb}</Card.Text>
                <Button >Button</Button>
              </Card.Body>
            </Card>
          ))}
        </section>
      </div>
    );
}