import './App.css';
import './Catalog.css';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { db } from "./Firebase";
import { ref, orderByChild, limitToLast, get, query, equalTo } from "firebase/database";

export default function Catalog() {
	const [newname1, setNewName1] = useState("");
	const [newname2, setNewName2] = useState("");
	const [newname3, setNewName3] = useState("");
	const [newname4, setNewName4] = useState("");

	useEffect(()=>{
		const latestClubs = query(ref(db, '/clubs'), orderByChild('createdAt'), limitToLast(4));

		get(latestClubs).then((snapshot) =>{
		  if(snapshot.exists()){
			var clubs = snapshot.val();
			var keys = Object.keys(clubs);
			setNewName1(clubs[keys[0]].name);
			setNewName2(clubs[keys[1]].name);
			setNewName3(clubs[keys[2]].name);
      setNewName4(clubs[keys[3]].name);

    } else{
			console.log("no data");
		  }
		}).catch((error) => {
		  console.error(error)
		})
	})

    const categories = [
      {
        name: "New Clubs",
        clubs: [
          {
            clubName: newname1,
            clubBlurb: "",
            clubImage: "",
          },
          {
            clubName: newname2,
            clubBlurb: "",
            clubImage: "",
          },
          {
            clubName: newname3,
            clubBlurb: "Coming Soon",
            clubImage: "placeholder.png",
          },
          {
            clubName: newname4,
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



// import './App.css';
// import './Catalog.css';
// import React, { useState, useEffect } from 'react';
// import {
// 	MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple
// } from 'mdb-react-ui-kit';
// import { db } from "./Firebase";
// import { ref, orderByChild, limitToLast, get, query, equalTo } from "firebase/database";

// function Club({ clubName, clubBlurb, clubImage }) {
// 	return (
// 		<div className="clubListing">
// 			<p className="clubBlurb">
// 				<a href="#">
// 					{clubName}
// 				</a>
// 				<br />
// 				<br />
// 				{clubBlurb}
// 			</p>
// 			<img className="clubImage"
// 				src={clubImage}
// 				alt="Club Listing"
// 			/>
// 		</div>
// 	);
// }

// function NewClubsCategory() {
// 	const [name, setName] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [name2, setName2] = useState("");
// 	const [description2, setDescription2] = useState("");
// 	// const [name3, setName3] = useState("");
// 	// const [description3, setDescription3] = useState("");
// 	// const [name4, setName4] = useState("");
// 	// const [description4, setDescription4] = useState("");
// 	useEffect(()=>{
// 		const sortedClubTimestamps = query(ref(db, '/clubs'), orderByChild('createdAt'));
// 		const latestClubs = query(sortedClubTimestamps, limitToLast(2)); //need more clubs

// 		get(latestClubs).then((snapshot) =>{
// 		  if(snapshot.exists()){
// 			var clubs = snapshot.val();
// 			var keys = Object.keys(clubs);
// 			// setName4(clubs[keys[0]].name);
// 			// setDescription4(clubs[keys[0]].description);
// 			// setName3(clubs[keys[1]].name);
// 			// setDescription3(clubs[keys[1]].description);
// 			setName2(clubs[keys[1]].name);
// 			setDescription2(clubs[keys[1]].description);
// 			setName(clubs[keys[0]].name);
// 			setDescription(clubs[keys[0]].description);
// 		} else{
// 			console.log("no data");
// 		  }
// 		}).catch((error) => {
// 		  console.error(error)
// 		})
// 	})



// 	return (
// 		<div>
// 			<h2>{ "New Clubs" }</h2>
// 			<section className="category">
// 				<Club clubName={name}
// 				clubBlurb={description}
// 				clubImage="clubcatalogimages/genshin_club.webp"
// 				/>
// 				<Club clubName={name2}
// 				clubBlurb=""
// 				clubImage="clubcatalogimages/genshin_club.webp"
// 				/>
// 			</section>
// 		</div>
		
		
// 	);
// }


// function Category({ category, clubCategoryAttribute }) {
// 	const [name, setName] = useState("");
// 	const [description, setDescription] = useState("");

// 	useEffect(()=>{
// 		const categorySortedClubs = query(ref(db, '/clubs'), orderByChild('clubType'), equalTo(clubCategoryAttribute));


// 		get(categorySortedClubs).then((snapshot) =>{
// 			if(snapshot.exists()){
// 				var clubs = snapshot.val();
// 				var keys = Object.keys(clubs);
// 				setName(clubs[keys[0]].name);
// 		  		setDescription(clubs[keys[0]].description);
// 	  } 	else{
// 		  console.log("no data");
// 		}
// 	  }).catch((error) => {
// 		console.error(error)
// 	  })
// 	})
// 	return (
// 		<div>
// 			<h2>{ category }</h2>
// 			<section className="category">
// 				<Club clubName={name}
// 				clubBlurb=""
// 				clubImage="clubcatalogimages/genshin_club.webp"
// 				/>
// 				<Club clubName="Coming Soon"
// 				clubBlurb="Coming Soon"
// 				clubImage="placeholder.png"
// 				/>
// 				<Club clubName="Coming Soon"
// 				clubBlurb="Coming Soon"
// 				clubImage="placeholder.png"
// 				/>
// 				<Club clubName="Coming Soon"
// 				clubBlurb="Coming Soon"
// 				clubImage="placeholder.png"
// 				/>
// 			</section>
// 		</div>
// 	);
// }

// export default function Catalog() {
// 	return (
// 		<>
// 			<div className="catalogMain">
// 				<NewClubsCategory/>
// 				<Category category="Academic Clubs" clubCategoryAttribute='academic'/>
// 				{/* <Category category="Resume Builders" />
// 				<Category category="Sports" />
// 				<Category category="Cultural" /> */}
// 			</div>
// 		</>
// 	);
// }