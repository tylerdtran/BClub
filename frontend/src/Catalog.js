import './App.css';
import './Catalog.css';
import React from 'react';
import {
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple
} from 'mdb-react-ui-kit';

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
          <div key={category.name}>
            <h2>{category.name}</h2>
            <Category clubs={category.clubs} />
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
            <MDBCard key={club.clubName}>
              <MDBRipple rippleColor='black' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src={club.clubImage} fluid alt='Club Image' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>{club.clubName}</MDBCardTitle>
                <MDBCardText>{club.clubBlurb}</MDBCardText>
                <MDBBtn href='#'>Button</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          ))}
        </section>
      </div>
    );
}