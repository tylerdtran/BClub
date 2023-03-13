// Based on Club
// handles the sorting and displaying of the reviews, deletes comment as well 
// Equivalent to the clubs page 

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Stack, Card } from 'react-bootstrap';
import '../App.css';
import { ClubInfo } from './ClubInfo';
import { Review } from './ReviewComponent';
import { ref, get, child, remove, query, orderByChild, equalTo, update } from "firebase/database";
import { db, auth } from '../Firebase';
import { useParams, useNavigate } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import moment from 'moment';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';

const calcAvg = (array) => Math.round(array.reduce((a, b) => a + b) / array.length);
const calcMode = (array) =>
    array.sort((a,b) =>
          array.filter(v => v===a).length
        - array.filter(v => v===b).length
    ).pop();

function calculateScores(data) {
    let newRatings = {
        overall: calcAvg(data.map(x => parseInt(x[1].overallrating))),
        activeness:  calcAvg(data.map(x => parseInt(x[1].activeness))),
        community:    calcAvg(data.map(x => parseInt(x[1].community))),
        competitiveness:  calcAvg(data.map(x => parseInt(x[1].competitiveness))),
        fun: calcAvg(data.slice().map(x => parseInt(x[1].fun))),
        rep:     calcMode(data.map(x => (x[1].rep))),
    };
    return newRatings;
}

function ReviewDisplay(props) {
    const { clubname } = useParams(); // change to club name 
    const nav = useNavigate();

    const reviewList = ref(db, 'reviews');
    const clubList = ref(db, 'clubs');
    // const instaList = ref(db, 'insta');

    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    const [loadingClub, setLoadingClub] = useState(true);
    const [clubInfo, setClubInfo] = useState({});

    // const [instaInfo, setInstaInfo] = useState([]);

    const user = auth.currentUser;

    const deleteReview = (reviewID) => {
        console.log("Deleting review", reviewID);
        remove(child(reviewList, reviewID));

        setReviews(prevReviews => {
            console.log("HEREEEEE")
            let newReviews = prevReviews.filter((review) => {
                return review.key !== reviewID;
            });
            return newReviews;
        });
    }

    //calculate club overall rating
    useEffect(() => {
        if (!loadingClub && !loading && reviews.length) {
            console.log("Calculating ratings...");
            let newRatings = calculateScores(reviews);
            if (!_.isEqual(newRatings, clubInfo?.rating)) {
                console.log("Updating ratings", newRatings, clubInfo?.overall);
                clubInfo.rating = newRatings;
                setClubInfo(clubInfo);

                //update db as well
                const clubRatingRef = child(clubList, clubname);
                update(clubRatingRef, {rating: newRatings});
            }
        }
    }, [loadingClub, loading, reviews, clubList, clubname, clubInfo])

    //get club info summary
    useEffect(() => {
        const fetchClubData = async () => {
            console.log("Getting club data...");
            setLoadingClub(true);
            get(child(clubList, clubname)).then((snapshot) => {
                if (snapshot.exists()) {
                    setClubInfo(snapshot.val());
                } else {
                    console.log("No data available");
                }
                setLoadingClub(false);
            }).catch((error) => {
                console.error(error);
                setLoadingClub(false);
            });
        }

        fetchClubData();
    }, [clubList, clubname]);

    // //get insta posts
    // useEffect(() => {
    //     const fetchInstaData = async () => {
    //         let match = clubInfo.insta?.match(/https:\/\/www\.instagram\.com\/(.*)\//);
    //         if (match)
    //         {
    //             let insta = match[1];
    //             console.log("Insta", insta);
    //             get(child(instaList, insta)).then((snapshot) => {
    //                 if (snapshot.exists()) {
    //                     console.log("Getting insta data...");
    //                     setInstaInfo([...snapshot.val()]);
    //                 } else {
    //                     setInstaInfo([]);
    //                     console.log("No data available");
    //                 }
    //             }).catch((error) => {
    //                 console.error(error);
    //             });
    //         }
    //     }

    //     fetchInstaData();
    // }, [clubInfo]);

    // SOURCE OF ISSUE: loading issue.
    //get reviews
    useEffect(() => {
        const fetchData = async () => {
            console.log("Getting reviews...");
            setLoading(true);
            let qRef = query(reviewList, orderByChild('club'), equalTo(clubname));
            let sorted = [];
            get(qRef).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    //sort by votes + newest
                    console.log("HEREEE!");
                    sorted = Object.entries(data).sort((review1, review2) => {
                        return moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
                        moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
                    }).sort((review1, review2) => {
                        return review2[1].votes - review1[1].votes;
                    })
                    setReviews(sorted);
                } else {
                    console.log("No data available");
                    setReviews([]);
                }
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
            });
        }

        fetchData();
    }, [reviewList, clubname]);

    //SORT - GOOD 
    const sortOptions = [
        { name: 'Votes (default)', value: 'votes'},
        { name: 'Date (newest first)', value: 'new'},
        { name: 'Date (oldest first)', value: 'old'}
    ]
    
    const [sortValue, setSortValue] = useState('votes');
    // Sorting function - GOOD 
    const handleSortChange = (value) => 
    {
        console.log("SORT", value);
        setSortValue(value);
        let sorted;
        if (value === 'votes') {
            sorted = reviews.sort((review1, review2) => {
                return review2[1].votes - review1[1].votes;
            })
        } else if (value === 'new') {
            sorted = reviews.sort((review1, review2) => {
                return moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
                moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
            })
        } else if (value === 'old') {
            sorted = reviews.sort((review1, review2) => {
                return moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
                moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
            })
        } else {
            console.error("Invalid sort value: ", value);
            return;
        }
        setReviews(sorted);
    }

    return (
        <div>
            <Container md={6}>
                <ClubInfo
                    data={clubInfo}
                    loading={loadingClub}
                />
                <Row className='mt-4'>
                    <Col >
                        <Stack direction='horizontal' gap={4} >
                            <Button
                                md={4}
                                variant='outline-primary'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (user) {
                                        nav("/WriteReview", {state: {club: clubInfo.url}});
                                    } else {
                                        nav("/SignInPage", {state: {next: "/WriteReview", nextState: {club: clubInfo.url}}});
                                    }
                                }}
                            >
                                Create a review...
                            </Button>
                            <div className='ms-auto'>
                                Sorted by 
                            </div>
                            <SelectSearch options={sortOptions} value={sortValue} onChange={handleSortChange} name="language" />
                        </Stack>

                        {loading ? 
                            "Loading reviews..." : 
                            reviews.length ? reviews.map(([key, value]) => {
                                return <Review key={key} id={key} data={value} deleteReview={deleteReview} />;
                            }) :
                            <Card className='mt-4 text-muted'>
                                <Card.Body>
                                    <Card.Text>No reviews yet.</Card.Text>
                                </Card.Body>
                            </Card>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { ReviewDisplay }

/* 
<Col md="auto">
                        {
                            instaInfo.map((instaCode) => {
                                return <socialEmbed code={instaCode} key={instaCode}/>;
                            })
                        }
                    </Col>
*/