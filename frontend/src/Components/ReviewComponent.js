// handles the actual review card 

import React, { useState, useEffect } from "react";
import { Card, Stack, ToggleButton, Row, Col, DropdownButton, Dropdown, Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import Rating from '@mui/material/Rating';

import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { ref, get, update } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.css';
// Drop down button 
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function StarRating(props) {
    return (
      <Card.Text className='mb-0 text-center'>
        {props.name}<br />
        <Rating name={props.name} defaultValue={props.stars} readOnly />
      </Card.Text>
    )
  }

  export function Review(props) {
    const [votes, setVotes] = useState([false, false]); 
    const [voteChange, setVoteChange] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [displayName, setDisplayName] = useState("");
    const [classYear, setClassYear] = useState("");
  
    const [user] = useAuthState(auth);
  

    const noUpdates = 0;
    const nav = useNavigate();
    const preferences = ref(db, `users-profile/${props.data.author}`)
    const userVoteRef = user != null ? ref(db, `users-profile/${user.uid}/votes/${props.id}`) : null; // check if logged in
  
    const popover = <Popover id="popover-basic">
      <Popover.Body>
        Must be logged in to vote.
      </Popover.Body>
    </Popover>;
    
    // Figure out how to set the displayName for the user. to reflect in the comments. 
    // get most recent flair info from database
    useEffect(() => {
      // console.log(props.id);
      get(preferences).then((snapshot) => {
        if (snapshot.exists()) {
          setDisplayName(snapshot.val().displayName);
          setClassYear(snapshot.val().classYear);
        }
      }).catch((error) => { console.log(error) });
  
      if (user != null) {
        get(userVoteRef).then(snapshot => {
          if (snapshot.exists()) {
            let userVote = snapshot.val();
            console.log(props.id, snapshot.val());
            if (userVote == 1) {
              setVotes([true, false]);
              setVoteChange(1);
            } else if (userVote == -1) {
              setVotes([false, true]);
              setVoteChange(-1);
            }
          }
        }).catch((error) => console.log(error))
      }
    }, [noUpdates]);
  
    function handleClick(clicked, votes, setVotes) {
      const noneClicked = !votes[0] && !votes[1] ? true : false;
      let result = [false, false];
  
      if (clicked === 'upvote') {
        if ((!votes[0] && votes[1]) || noneClicked) {
          result = [true, false]; // click upvote, downvote checked
        } else {
          result = [false, false];
        }
      } else if (clicked === 'downvote') {
        if ((votes[0] && !votes[1]) || noneClicked) {
          result = [false, true]; // click downvote, upvote checked
        } else {
          result = [false, false];
        }
      }
      
      // updating the votes for the user 
      let updateRef = ref(db, `users-profile/${user.uid}/votes`);
      update(updateRef, { [props.id]: (result[0] - result[1]) });
  
      let updateVoteRef = ref(db, `reviews/${props.id}`);
      update(updateVoteRef, { votes: props.data.votes + result[0] - result[1] - voteChange });
  
      setVotes(result);
    }
  
    return (
      <div>
        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton />
          <Modal.Body className='text-center'>
            <h5 className='pb-2'>Are you sure you want to delete this review?</h5>
            <Button
              variant="outline-danger"
              onClick={() => {
                handleCloseDelete();
                props.deleteReview(props.id)
              }}
            >Delete</Button>
          </Modal.Body>
        </Modal>
        <Card className='mt-4'>
          <Card.Body>
            <Stack direction='horizontal' gap={2}>
              <Button variant="contained" >{props.data.displayName}</Button>
              <Button variant="contained" >{classYear}</Button>
              {
                user && props.data.author === user.uid && props.deleteReview != null &&
                <DropdownButton variant='light' title='More' className='ms-auto' align="end">
                  <Dropdown.Item onClick={() => {
                    nav("/editReview", { state: { id: props.id, data: props.data } });
                  }}><EditIcon/>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={handleShowDelete}><DeleteIcon/>Delete</Dropdown.Item>
                </DropdownButton>
              }
            </Stack>
            <Row className='pt-2'>
              <Col>
                <Card.Text className='mt-2'>{props.data.text}</Card.Text>
                <Card.Text className='text-muted'>{props.data.dateTime}</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Title className='text-center'>{props.data.oneword}</Card.Title>
                <hr />
                <StarRating name="Overall" stars={props.data.overall} />
                <StarRating name="Activeness" stars={props.data.activeness} />
                <StarRating name="Community" stars={props.data.community} />
                <StarRating name="Competitiveness" stars={props.data.competitiveness} />
                <StarRating name="Fun" stars={props.data.fun} />
              </Col>
            </Row>
            <Stack direction='horizontal' className='d-flex align-self-center' gap={1}>
              {!user ?
                <>
                  <OverlayTrigger placement="top" overlay={popover} delay={{ show: 250, hide: 250 }}>
                    <span>
                      <ToggleButton
                        className="mb-2"
                        type="checkbox"
                        variant="outline-primary"
                        size='sm'
                        disabled
                      >
                        <ThumbUpIcon />
                      </ToggleButton>
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={popover} delay={{ show: 250, hide: 250 }}>
                    <span>
                      <ToggleButton
                        className="mb-2"
                        type="checkbox"
                        variant="outline-primary"
                        size='sm'
                        disabled
                      >
                        <ThumbDownIcon />
                      </ToggleButton>
                    </span>
                  </OverlayTrigger>
                </> :
                <>
                  <ToggleButton
                    className="mb-2"
                    id={"upvote" + props.data.dateTime}
                    type="checkbox"
                    variant="outline-primary"
                    checked={votes[0]}
                    value="upvote"
                    onChange={() => handleClick('upvote', votes, setVotes)}
                    size='sm'
                  >
                    <ThumbUpIcon />
                  </ToggleButton>
                  <ToggleButton
                    className="mb-2"
                    id={"downvote" + props.data.dateTime}
                    type="checkbox"
                    variant="outline-primary"
                    checked={votes[1]}
                    value="downvote"
                    onChange={() => handleClick('downvote', votes, setVotes)}
                    size='sm'
                  >
                    <ThumbDownIcon />
                  </ToggleButton>
                </>
              }
              <Card.Text className='p-2'>{props.data.votes + votes[0] - votes[1] - voteChange}</Card.Text>
            </Stack>
          </Card.Body>
        </Card>
      </div>
    );
  }
  
  // // https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
  // // For todays date;
  // Date.prototype.today = function () {
  //   return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
  // }
  
  // // For the time now
  // Date.prototype.timeNow = function () {
  //   return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
  // }
  