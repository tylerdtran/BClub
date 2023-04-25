// Review writing page, hopefully this can be inside the club page 
import React, { useState } from 'react';
import { Form, Card, Col, Button, Stack } from 'react-bootstrap';
import { ref, push, update } from "firebase/database";
import { db, auth } from '../Firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchClubs from '../Components/SearchClubs';


function ReviewRate(props) {
    return (
        <Form.Group className='m-4'>
            <Form.Label className='d-flex justify-content-center'>{props.title}</Form.Label>
            <Stack direction='horizontal' gap={3} className='d-flex justify-content-center'>
                {['1', '2', '3', '4', '5'].map((value) => (
                    <Form.Check required label={value} name={props.name}type="radio" id={`${props.name}-${value}`}
                        onChange={() => {
                            props.saveHandler(props.name, value);
                        }}
                        defaultChecked={props.defaultValue === value ? true : false}
                    />
                ))}
            </Stack>
        </Form.Group>
    );
}

export function WriteReview() {
    const nav = useNavigate();
    const location = useLocation();

    // reviews from database
    const reviewList = ref(db, 'reviews');
    const [validated, setValidated] = useState(false);

    // clubtype
    const [oneword, setOneWord] = useState(location?.state?.data != null ? location?.state?.data.oneword : "");
    // numerical ratings
    const [club, setClub] = useState(location?.state?.data != null ? location?.state?.data.club : location?.state?.club);
    const [overall, setOverall] = useState(location?.state?.data != null ? parseInt(location?.state?.data.overall) : 0);
    const [activeness, setActiveness] = useState(location?.state?.data != null ? parseInt(location?.state?.data.activeness) : 0);
    const [community, setCommunity] = useState(location?.state?.data != null ? parseInt(location?.state?.data.community) : 0);
    const [competitiveness, setCompetitiveness] = useState(location?.state?.data != null ? parseInt(location?.state?.data.competitiveness) : 0);
    const [fun, setFun] = useState(location?.state?.data != null ? parseInt(location?.state?.data.fun) : 0);

    // text review
    const [displayName, setDisplayName] = useState(location?.state?.data != null ? location?.state?.data.displayName : "");
    const [text, setText] = useState(location?.state?.data != null ? location?.state?.data.text : "");

    const saveClub = (newclub) => {
        
        setClub(newclub);
    }

    const saveRating = (name, value) => {
        switch (name) {
            case 'overall':
                setOverall(value);
                break;
            case 'activeness':
                setActiveness(value);
                break;
            case 'community':
                setCommunity(value);
                break;
            case 'competitiveness':
                setCompetitiveness(value);
                break;
            case 'fun':
                setFun(value);
                break;
            default:
                console.log("Error: " + name + ' ' + value);
        }
    }
    // For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.currentTime = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

    const saveReview = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!club) {
            //TODO: figure out a way to validate better maybe
            alert("Need to enter a club name.");
        }
        if (form.checkValidity() === false || !club) {
            event.stopPropagation();
            setValidated(true);
        } else {
            let key = "";
            let currentDateTime = "";
            let votes = 0;
            const user = auth.currentUser;
            if (location?.state?.data != null) {
                console.log("updating edits...");
                key = location?.state?.id; // use current review id
                currentDateTime = location?.state?.data.dateTime; // use old dateTime
                votes = location?.state?.data.votes; // use old votes
            } else {
                console.log("updating new review...");
                key = push(reviewList).key; // get new review id 
                const newDate = new Date();
                currentDateTime = newDate.today() + ' ' + newDate.currentTime(); // get new dateTime
            }
            let rev = {
                "club": club,
                "author": user.uid,
                "displayName": displayName,
                "text": text,
                "dateTime": currentDateTime,
                "overall": overall,
                "activeness": activeness,
                "community": community,
                "competitiveness": competitiveness,
                "fun": fun,
                "votes": votes,
                "oneword": oneword
            };
            const updates = {};
            updates['/reviews/' + key] = rev;
            update(ref(db), updates).catch((error) => {
                console.log(error);
            });
            window.location.reload();
            setValidated(true);
            nav(`/clubs/${club}`); 
        }
        setValidated(true);
    }

    return (
        <div>
            <Col >
                <Card >
                    <Card.Body>
                        <h4 className='text-center'>
                            {location?.state?.data != null ? "Edit a Review" : "Write a Review"}
                        </h4>
                        <hr />
                        <div className='text-center text-muted'>
                            <Card.Text>
                                Tell us what you think! <br />
                                Rate the club from 1 to 5 with 1 being the worst and 5 being the best.
                            </Card.Text>
                        </div>
                        <Form noValidate validated={validated} onSubmit={saveReview}>
                            <Form.Group className='m-4'>
                                <Form.Label className='d-flex justify-content-center'>Club</Form.Label>
                                <div className='d-flex justify-content-center'>
                                    <SearchClubs nav={false} handleSelect={saveClub} value={club} />
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='d-flex justify-content-center'>What would you like your reviewer name to be?</Form.Label>
                                <div className='d-flex justify-content-center'>
                                    <Form.Control 
                                    required 
                                    size="sm" 
                                    type="text"
                                    className='mb-3' 
                                    onChange={(e) => { setDisplayName(e.target.value) }} 
                                    style={{ width: 300 }}
                                    value={displayName}
                                    />
                                </div>
                            </Form.Group>
                                <ReviewRate title="What's your overall rating of the club?" name='overall' saveHandler={saveRating} defaultValue={overall} />
                                <ReviewRate title="How active is the club?" name='activeness' saveHandler={saveRating} defaultValue={activeness} />
                                <ReviewRate title="How would you rate the sense of community?" name='community' saveHandler={saveRating} defaultValue={community} />
                                <ReviewRate title="Competitiveness? 1 = Most Difficult to 5 = For everyone" name='competitiveness' saveHandler={saveRating} defaultValue={competitiveness} />
                                <ReviewRate title="How fun is the club?" name='fun' saveHandler={saveRating} defaultValue={fun} />
                            <Form.Group>
                                <Form.Label className='d-flex justify-content-center'>One word to characterize this club</Form.Label>
                                <div className='d-flex justify-content-center'>
                                    <Form.Control 
                                    required 
                                    size="sm" 
                                    type="text"
                                    className='mb-3' 
                                    onChange={(e) => { setOneWord(e.target.value) }} 
                                    style={{ width: 300 }}
                                    value={oneword}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className='px-2'>
                                <Form.Control
                                    required
                                    as="textarea"
                                    rows={3}
                                    placeholder='Write a review...'
                                    onChange={(event) => setText(event.target.value)}
                                    value={text}
                                />
                            </Form.Group>
                            <div className='d-grid px-5'>
                                <Button
                                    type="submit"
                                    className='mt-3' 
                                >Submit Review</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
}


