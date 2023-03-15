import './App.css';
import './Catalog.css';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { db } from "./Firebase";
import { ref, orderByChild, limitToLast, get, query, equalTo } from "firebase/database";
import { render } from '@testing-library/react';

export default function Catalog() {
  const [newClubs, setNewClubs] = useState([]);
  const [educationalClubs, setEducationalClubs] = useState([]);
  const [recreationalClubs, setRecreationalClubs] = useState([]);

  useEffect(() => {
    const latestClubs = query(ref(db, "/clubs"), orderByChild("createdAt"), limitToLast(4));
    get(latestClubs)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var clubs = snapshot.val();
          const clubArray = Object.keys(clubs).map((key) => clubs[key]);
          console.log("Value:", clubArray[0].name);
          setNewClubs(clubArray);
        } else {
          console.log("no data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 

  useEffect(() => {
    const categorySortedClubs = query(ref(db, '/clubs'), orderByChild('clubType'), equalTo('academic')); //CHANGE
    get(categorySortedClubs)
    .then((snapshot) => {
      if (snapshot.exists()) {
        var clubs = snapshot.val();
        const clubArray = Object.keys(clubs).map((key) => clubs[key]);
        setEducationalClubs(clubArray); //CHANGE
      } else {
        console.log("no data");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, []); 

  useEffect(() => {
    const categorySortedClubs = query(ref(db, '/clubs'), orderByChild('clubType'), equalTo('recreational')); //CHANGE
    get(categorySortedClubs)
    .then((snapshot) => {
      if (snapshot.exists()) {
        var clubs = snapshot.val();
        const clubArray = Object.keys(clubs).map((key) => clubs[key]);
        setRecreationalClubs(clubArray); //CHANGE
      } else {
        console.log("no data");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, []); 

  const renderClubCategory = (Name, clubs) => ({
    name: Name,
    clubs: clubs.map((club) => ({
      clubName: club.name || "",
      clubBlurb: club.description || club.blurb || "Coming Soon",
      clubImage: club.image || "placeholder.png",
    })),
  });


    const categories = [
      renderClubCategory("Featured", [
        {
          name: "Genshin Impact at UCLA",
          blurb: "The definitive community for Genshin Impact at UCLA",
          image: "clubcatalogimages/genshin_club.webp",
        },
        {
          name: "Bruin Club Tennis",
          blurb: "The best club ever!",
          image: "clubcatalogimages/BruinClubTennis.png",
        },
        { name: "Here soon", image: "placeholder.png" },
        { name: "Not Soon", image: "placeholder.png" },
      ]),
      renderClubCategory("New Clubs", newClubs),
      renderClubCategory("Educational", educationalClubs),
      renderClubCategory("Recreational", recreationalClubs),
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

function Category({ clubs }) {
    return (
      <div>
        <section className="category">
          <div className="empty-grid-item"></div> {/* Add empty grid item */}
          {clubs.map((club) => (
             club.clubName !== "" && (
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
          )
          ))}
        </section>
      </div>
    );
}