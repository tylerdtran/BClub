import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Col, Button, Card, Toast, ToastContainer } from 'react-bootstrap'
import { db, auth } from '../Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, get, update } from "firebase/database";
import { useNavigate } from 'react-router-dom';

export default function Profile() {

	const [user] = useAuthState(auth);
	console.log(user);
	let nav = useNavigate();
	if (user == null)
	{
		nav("/SignInPage")
	}
	const [displayName, setDisplayName] = useState("");
	const [classYear, setClassYear] = useState("");
	const [approved, setApproved] = useState(false);
	const preferences = ref(db, `users-profile/` + user?.uid);
	const [showSave, setShowSave] = useState(false);
    const [disabled, setDisabled] = useState(false);

	const start = 1970;
    const end = 2027;
    let classes = [...Array(end - start + 1).keys()].map(x => x + start);
    classes.reverse();

	useEffect(() => {
        get(preferences).then((snapshot) => {
            if (snapshot.exists()) {
                setClassYear(snapshot.val().classYear);
                console.log(displayName + " " + classYear);
            }
        }).catch((error) => { console.log(error) });
    }, []);

	const handleSubmission = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const key = auth.currentUser.uid;
            let newProfile = {
				displayName: displayName,
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
        setApproved(true);
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
					<hr />
					<Card.Text>Want to update your account information?</Card.Text>
					<Col md={4}>
						<Form noValidate approved={approved} onSubmit={handleSubmission}>
							<FormGroup className="mb-3" onChange={(e) => { setDisplayName(e.target.value) }}>
								<Form.Control required value={displayName} placeholder="Enter a new Reviewer Name ">
								</Form.Control>
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
		</div>
	);
}

