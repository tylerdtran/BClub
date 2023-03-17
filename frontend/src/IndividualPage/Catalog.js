import '../App.css';
import '../Catalog.css';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { db } from "../Firebase";
import { ref, orderByChild, limitToLast, get, query, equalTo } from "firebase/database";

export default function Catalog() {
  const [newClubs, setNewClubs] = useState([]);
  useEffect(() => {
    const latestClubs = query(ref(db, "/clubs"), orderByChild("createdAt"), limitToLast(5));
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
    fetchClubsByType('Academic', setEducationalClubs);
    fetchClubsByType('Arts', setArtsClubs);
    fetchClubsByType('Career', setCareerClubs);
    fetchClubsByType('Community Service', setCommunityServiceClubs);
    fetchClubsByType('Cultural', setCulturalClubs);
    fetchClubsByType('Recreational', setRecreationalClubs);
    fetchClubsByType('Technological', setTechnologicalClubs);
    fetchClubsByType('Other', setOtherClubs);

  }, []);

  const makeClubCategory = (Name, clubs) => ({
    name: Name,
    clubs: clubs.map((club) => ({
      clubName: club.name || "",
      clubBlurb: club.description || club.blurb || "Coming Soon",
      clubImage: club.imageUrl || "placeholder.png",
      url: club.url
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
        <Button className="goToClubForm" href="/ClubsForm">
				  Submit a new club!
			  </Button>
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
    const goToClub = (url) => {
    const websiteName = window.location.origin;
    window.open(`${websiteName}/clubs/${url}`, "_blank", "noopener noreferrer");
  }
    return (
      <div>
        <section className="category">
          <div className="empty-grid-item"></div> {/* Add empty grid item */}
          {clubs.map((club) => (
             club.clubName !== "" && (
            <Card key={club.clubName} nav="clubs/Bruin-Club-Tennis">
                <Card.Img src={club.clubImage} fluid alt='Club Image' />
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
              <Card.Body>
                <Card.Title>{club.clubName}</Card.Title>
                <Card.Text>{club.clubBlurb}</Card.Text>
                <Button onClick={() => goToClub(club.url)}>Checkout Club</Button>
              </Card.Body>
            </Card>
          )
          ))}
        </section>
      </div>
    );
}