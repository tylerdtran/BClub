import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Col, Button, Card, Toast, ToastContainer } from 'react-bootstrap'
import { db, auth } from '../Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, get, update } from "firebase/database";
// import Review from "../Components/Review";
import { RatingBar } from "../Components/RatingBar"
import 'bootstrap/dist/css/bootstrap.css';

export default function Profile() {

	const [user, loading, error] = useAuthState(auth);
	const [email, setEmail] = useState("");
	const [classYear, setClassYear] = useState("");
	const [validated, setValidated] = useState(false);
	const preferences = ref(db, "users-profile/" + user.uid); // get author pref
	const [showSave, setShowSave] = useState(false);
    const [disabled, setDisabled] = useState(false);

	const start = 1950;
    const end = 2030;
    let classes = [...Array(end - start + 1).keys()].map(x => x + start);
    classes.reverse();

	useEffect(() => {
        get(preferences).then((snapshot) => {
            if (snapshot.exists()) {
                setEmail(snapshot.val().email);
                setClassYear(snapshot.val().classYear);
                console.log(email + " " + classYear);
            }
        }).catch((error) => { console.log(error) });
    }, [preferences, email, classYear]);

	const handleSubmission = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const key = auth.currentUser.uid;
            let newProfile = {
                email: email,
                classYear: classYear
            };
            const updates = {};
            updates['/users-profile/' + key] = newProfile;
            update(ref(db), updates).catch((error) => {
                console.log(error);
            }).then(() => {
                setShowSave(true);
                setDisabled(true);
            }).catch((error) => { console.log(error) });
        }
        setValidated(true);
    }



	return (
		<div>
		<Card>
			<Card.Body>
				<ToastContainer className="p-3" position="top-center">
					<Toast onClose={() => setShowSave(false)} show={showSave} delay={3000} autohide bg="secondary">
						<Toast.Body>Updates saved.</Toast.Body>
					</Toast>
				</ToastContainer>
				<Card.Title>Hello {user.displayName}!</Card.Title>
				<hr />
				<Card.Text>Update account information</Card.Text>
				<Col md={4}>
					<Form noValidate validated={validated} onSubmit={handleSubmission}>
						<FormGroup className="mb-3">
							<Form.Control required value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
						</FormGroup>
						<FormGroup className="mb-3" onChange={(e) => { setClassYear(e.target.value) }}>
							<Form.Select required value={classYear}>
								<option value="">Select your class year</option>
								{classes.map((x) => (
									<option value={x}>{x}</option>
								))}
							</Form.Select>
						</FormGroup>
						<Button type="submit" disabled={disabled}>Save</Button>
					</Form>
				</Col>
			</Card.Body>
        </Card>
			<div>
				<RatingBar title="Overall" rating={4}/>	
			</div>
		</div>
	);
}

