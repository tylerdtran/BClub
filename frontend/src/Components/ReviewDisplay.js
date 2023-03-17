import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Stack, Card } from 'react-bootstrap';
import '../App.css';
import moment from 'moment';
import _ from 'lodash';
import { ClubInfo } from './ClubInfo';
import { Review } from './ReviewComponent';
import { ref, get, child, remove, query, orderByChild, equalTo, update } from "firebase/database";
import { db, auth } from '../Firebase';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { WriteReview } from './WriteReview';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const calcAvg = (array) => Math.round(array.reduce((a, b) => a + b) / array.length);

function calculateScores(data) {
    let newRatings = {
        overall: calcAvg(data.map(x => parseInt(x[1].overall))),
        activeness:  calcAvg(data.map(x => parseInt(x[1].activeness))),
        community:    calcAvg(data.map(x => parseInt(x[1].community))),
        competitiveness:  calcAvg(data.map(x => parseInt(x[1].competitiveness))),
        fun:  calcAvg(data.map(x => parseInt(x[1].fun)))
    };
    return newRatings;
}

export function ReviewDisplay() {
    const { clubname } = useParams();
    const nav = useNavigate();

    const reviewList = ref(db, 'reviews');
    const clubList = ref(db, 'clubs');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [clubsQueue, setClubsQueue] = useState(true);
    const [clubInfo, setClubInfo] = useState({});
    const [reviewWriting, setReviewWriting] = useState(false);

    // Create a function that extends the button 

    const user = auth.currentUser;

    const deleteReview = (reviewID) => {
        console.log("Deleting review", reviewID);
        remove(child(reviewList, reviewID));

        setReviews(prevReviews => {
            let newReviews = prevReviews.filter((review) => {
                return review.key !== reviewID;
            });
            return newReviews;
        });
    }

    //calculate club overall rating
    useEffect(() => {
        if (!clubsQueue && !loading && reviews.length) {
            console.log("Calculating ratings...");
            let newRatings = calculateScores(reviews);
            if (!_.isEqual(newRatings, clubInfo?.rating)) {
                console.log("Updating ratings", newRatings, clubInfo?.rating);
                clubInfo.rating = newRatings;
                setClubInfo(clubInfo);
                const clubRatingRef = child(clubList, clubname);
                update(clubRatingRef, {rating: newRatings});
            }
        }
    }, [clubsQueue, loading])

    // retrieving data from clubs 
    useEffect(() => {
        const fetchClubData = async () => {
            console.log("Getting club data...");
            setClubsQueue(true);
            get(child(clubList, clubname)).then((snapshot) => {
                if (snapshot.exists()) {
                    setClubInfo(snapshot.val());
                } else {
                    console.log("No data");
                }
                setClubsQueue(false);
            }).catch((error) => {
                console.error(error);
                setClubsQueue(false);
            });
        }

        fetchClubData();
    }, [clubname]);


    useEffect(() => {
        const fetchData = async () => {
            console.log("Getting reviews...");
            setLoading(true);
            let qRef = query(reviewList, orderByChild('club'), equalTo(clubname));
            let sorted = [];
            get(qRef).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    sorted = Object.entries(data).sort((review1, review2) => {
                        return moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
                        moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
                    }).sort((review1, review2) => {
                        return review2[1].votes - review1[1].votes;
                    })
                    setReviews(sorted);
                    console.log("it made it all the way here");

                } else {
                    console.log("No data retreived");
                    setReviews([]);
                }
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
            });
        }

        fetchData();
    }, [clubname]);

    
    const [sortValue, setSortValue] = useState('votes');

    const handleSortChange = (value) => 
    {
        setSortValue(value);
        let sorted;
        if (value === 'votes') {
            sorted = reviews.sort((review1, review2) => {
                return review2[1].votes - review1[1].votes;
            })
        } else if (value === 'newest') {
            sorted = reviews.sort((review1, review2) => {
                return moment(review2[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf() -
                moment(review1[1].dateTime, "DD/MM/YYYY HH:mm:ss").valueOf();
            })
        } else if (value === 'oldest') {
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
                    loading={clubsQueue}
                />
                <Row className='mt-4'>
                    <Col>
                        <Stack direction='horizontal' gap={4} >
                            <Button
                                md={4}
                                variant='outline-primary'
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log("it made it here");
                                    if (user) {
                                        setReviewWriting(true);
                                    } else {
                                        nav("/SignInPage", {state: {next: "/WriteReview", nextState: {club: clubInfo.url}}});
                                    }
                                }}
                            >
                                Write a review...<EditIcon/>
                            </Button>

                        </Stack>
                        { reviewWriting ?
                            <div>
                                <WriteReview /> 
                                <Button className="justify-content-center" onClick={(e) => {
                                    e.preventDefault();
                                    setReviewWriting(false);
                                   
                                }}> 
                                    Cancel Review Writing <ArrowDropUpIcon/>
                                </Button>
                            </div>
                            : <div></div>}
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


