import './App.css';
import React from 'react';

export default function Homepage(){
	return(
		<>
			<input type="text" name="searchBar" id="searchBar" placeholder="Search"></input>
			<main>
				<section className="featureSection">
					<h2>Club Spotlight</h2>
					<h3>
						Genshin Impact at UCLA
					</h3>
					<div className="featurePhoto">
						<figcaption>Genshin Theme Song Jeopardy Event - February 7, 2023</figcaption>
						<img src="featuredevent.jpg" alt="Featured Event"/>
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

// import React, { useState, useEffect } from 'react'
// import { Container, Row, Col, Button, Stack, Card } from 'react-bootstrap'
// import '../App.css'
// import { FratSummary } from '../components/FratSummary';
// import { Review } from '../components/Review';
// import { ref, get, child, remove, query, orderByChild, equalTo, update } from "firebase/database";
// import { db, auth } from '../index';
// import { InstaEmbed } from '../components/InstaEmbed';
// import { Page } from '../components/Page'
// import { useParams, useNavigate } from 'react-router-dom';
// import SelectSearch from 'react-select-search';
// import moment from 'moment';
// import _ from 'lodash';

// const calcAvg = (array) => Math.round(array.reduce((a, b) => a + b) / array.length);
// const calcMode = (array) =>
//     array.sort((a,b) =>
//           array.filter(v => v===a).length
//         - array.filter(v => v===b).length
//     ).pop();

// function calculateScores(data) {
//     let newRatings = {
//         overall: calcAvg(data.map(x => parseInt(x[1].overall))),
//         friend:  calcAvg(data.map(x => parseInt(x[1].friend))),
//         phil:    calcAvg(data.map(x => parseInt(x[1].phil))),
//         social:  calcAvg(data.map(x => parseInt(x[1].social))),
//         brother: calcAvg(data.slice().map(x => parseInt(x[1].brother))),
//         rep:     calcMode(data.map(x => (x[1].rep))),
//     };
//     return newRatings;
// }

// function Frat(props) {
//     const { fratname } = useParams();
//     const nav = useNavigate();

//     const reviewList = ref(db, 'reviews');
//     const fratList = ref(db, 'frats');
//     const instaList = ref(db, 'insta');

//     const [loading, setLoading] = useState(true);
//     const [reviews, setReviews] = useState([]);

//     const [loadingFrat, setLoadingFrat] = useState(true);
//     const [fratInfo, setFratInfo] = useState({});

//     const [instaInfo, setInstaInfo] = useState([]);

//     const user = auth.currentUser;

//     const deleteReview = (reviewID) => {
//         console.log("Deleting review", reviewID);
//         remove(child(reviewList, reviewID));

//         setReviews(prevReviews => {
//             console.log("HEREEEEE")
//             let newReviews = prevReviews.filter((review) => {
//                 return review.key !== reviewID;
//             });
//             return newReviews;
//         });
//     }

//     //calculate frat overall rating
//     useEffect(() => {
//         if (!loadingFrat && !loading && reviews.length) {
//             console.log("Calculating ratings...");
//             let newRatings = calculateScores(reviews);
//             if (!_.isEqual(newRatings, fratInfo?.rating)) {
//                 console.log("Updating ratings", newRatings, fratInfo?.rating);
//                 fratInfo.rating = newRatings;
//                 setFratInfo(fratInfo);

//                 //update db as well
//                 const fratRatingRef = child(fratList, fratname);
//                 update(fratRatingRef, {rating: newRatings});
//             }
//         }
//     }, [loadingFrat, loading])

//     //get frat info summary
//     useEffect(() => {
//         const fetchFratData = async () => {
//             console.log("Getting frat data...");
//             setLoadingFrat(true);
//             get(child(fratList, fratname)).then((snapshot) => {
//                 if (snapshot.exists()) {
//                     setFratInfo(snapshot.val());
//                 } else {
//                     console.log("No data available");
//                 }
//                 setLoadingFrat(false);
//             }).catch((error) => {
//                 console.error(error);
//                 setLoadingFrat(false);
//             });
//         }

//         fetchFratData();
//     }, [fratname]);

//     //get insta posts
//     useEffect(() => {
//         const fetchInstaData = async () => {
//             let match = fratInfo.insta?.match(/https:\/\/www\.instagram\.com\/(.*)\//);
//             if (match)
//             {
//                 let insta = match[1];
//                 console.log("Insta", insta);
//                 get(child(instaList, insta)).then((snapshot) => {
//                     if (snapshot.exists()) {
//                         console.log("Getting insta data...");
//                         setInstaInfo([...snapshot.val()]);
//                     } else {
//                         setInstaInfo([]);
//                         console.log("No data available");
//                     }
//                 }).catch((error) => {
//                     console.error(error);
//                 });
//             }
//         }

//         fetchInstaData();
//     }, [fratInfo]);

//     //get reviews
//     useEffect(() => {
//         const fetchData = async () => {
//             console.log("Getting reviews...");
//             setLoading(true);
//             let qRef = query(reviewList, orderByChild('frat'), equalTo(fratname));
//             let sorted = [];
//             get(qRef).then((snapshot) => {
//                 if (snapshot.exists()) {
//                     let data = snapshot.val();
//                     //sort by votes + newest
//                     sorted = Object.entries(data).sort((review1, review2) => {
//                         return moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
//                         moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
//                     }).sort((review1, review2) => {
//                         return review2[1].votes - review1[1].votes;
//                     })
//                     setReviews(sorted);
//                 } else {
//                     console.log("No data available");
//                     setReviews([]);
//                 }
//                 setLoading(false);
//             }).catch((error) => {
//                 console.error(error);
//                 setLoading(false);
//             });
//         }

//         fetchData();
//     }, [fratname]);

//     //SORT
//     const sortOptions = [
//         { name: 'Votes (default)', value: 'votes'},
//         { name: 'Date (newest first)', value: 'new'},
//         { name: 'Date (oldest first)', value: 'old'}
//     ]
    
//     const [sortValue, setSortValue] = useState('votes');

//     const handleSortChange = (value) => 
//     {
//         console.log("SORT", value);
//         setSortValue(value);
//         let sorted;
//         if (value === 'votes') {
//             sorted = reviews.sort((review1, review2) => {
//                 return review2[1].votes - review1[1].votes;
//             })
//         } else if (value === 'new') {
//             sorted = reviews.sort((review1, review2) => {
//                 return moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
//                 moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
//             })
//         } else if (value === 'old') {
//             sorted = reviews.sort((review1, review2) => {
//                 return moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
//                 moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
//             })
//         } else {
//             console.error("Invalid sort value: ", value);
//             return;
//         }
//         setReviews(sorted);
//     }

//     return (
//         <Page>
//             <Container md={6}>
//                 <FratSummary
//                     data={fratInfo}
//                     loading={loadingFrat}
//                 />
//                 <Row className='mt-4'>
//                     <Col >
//                         <Stack direction='horizontal' gap={4} >
//                             <Button
//                                 md={4}
//                                 variant='outline-primary'
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     if (user) {
//                                         nav("/createReview", {state: {frat: fratInfo.url}});
//                                     } else {
//                                         nav("/login", {state: {next: "/createReview", nextState: {frat: fratInfo.url}}});
//                                     }
//                                 }}
//                             >
//                                 Create a review...
//                             </Button>
//                             <Button
//                                 md={4}
//                                 variant='outline-primary'
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     nav("/compare", {state: {frat: fratname}})
//                                 }}>
//                                 Compare this frat...
//                             </Button>
//                             <div className='ms-auto'>
//                                 Sorted by 
//                             </div>
//                             <SelectSearch options={sortOptions} value={sortValue} onChange={handleSortChange} name="language" />
//                         </Stack>

//                         {loading ? 
//                             "Loading reviews..." : 
//                             reviews.length ? reviews.map(([key, value]) => {
//                                 return <Review key={key} id={key} data={value} deleteReview={deleteReview} />;
//                             }) :
//                             <Card className='mt-4 text-muted'>
//                                 <Card.Body>
//                                     <Card.Text>No reviews yet.</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         }
//                     </Col>
//                     <Col md="auto">
//                         {
//                             instaInfo.map((instaCode) => {
//                                 return <InstaEmbed code={instaCode} key={instaCode}/>;
//                             })
//                         }
//                     </Col>
//                 </Row>
//             </Container>
//         </Page>
//     );
// }

// export { Frat }
