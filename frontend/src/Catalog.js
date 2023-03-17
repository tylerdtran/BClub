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



  const [artsClubs, setArtsClubs] = useState([]);
  const [careerClubs, setCareerClubs] = useState([]);
  const [communityServiceClubs, setCommunityServiceClubs] = useState([]);
  const [culturalClubs, setCulturalClubs] = useState([]);
  const [educationalClubs, setEducationalClubs] = useState([]);
  const [recreationalClubs, setRecreationalClubs] = useState([]);
  const [technologicalClubs, setTechnologicalClubs] = useState([]);
  const [otherClubs, setOtherClubs] = useState([]);


  const fetchClubsByType = async (clubType, setClubs) => {
    const categorySortedClubs = query(ref(db, '/clubs'), orderByChild('clubType'), equalTo(clubType));
    try {
      const snapshot = await get(categorySortedClubs);
      if (snapshot.exists()) {
        const clubs = snapshot.val();
        const clubArray = Object.keys(clubs).map((key) => clubs[key]);
        setClubs(clubArray);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClubsByType('academic', setEducationalClubs);
    fetchClubsByType('arts', setArtsClubs);
    fetchClubsByType('career', setCareerClubs);
    fetchClubsByType('community service', setCommunityServiceClubs);
    fetchClubsByType('cultural', setCulturalClubs);
    fetchClubsByType('recreational', setRecreationalClubs);
    fetchClubsByType('technological', setTechnologicalClubs);
    fetchClubsByType('other', setOtherClubs);

  }, []);

  const makeClubCategory = (Name, clubs) => ({
    name: Name,
    clubs: clubs.map((club) => ({
      clubName: club.name || "",
      clubBlurb: club.description || club.blurb || "Coming Soon",
      clubImage: club.imageUrl || "placeholder.png",
    })),
  });


    const categories = [
      makeClubCategory("Newly Added Clubs", newClubs),
      makeClubCategory("Arts", artsClubs),
      makeClubCategory("Career", careerClubs),
      makeClubCategory("Community Service", communityServiceClubs),
      makeClubCategory("Cultural", culturalClubs),
      makeClubCategory("Educational", educationalClubs),
      makeClubCategory("Recreational", recreationalClubs),
      makeClubCategory("Technological", technologicalClubs),
      makeClubCategory("Other", otherClubs),
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
            <Card key={club.clubName} nav="clubs/Bruin-Club-Tennis">
                <Card.Img src={club.clubImage} fluid alt='Club Image' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              <Card.Body>
                <Card.Title>{club.clubName}</Card.Title>
                <Card.Text>{club.clubBlurb}</Card.Text>
                <Button>Explore what other Bruins Think!</Button>
              </Card.Body>
            </Card>
          )
          ))}
        </section>
      </div>
    );
}