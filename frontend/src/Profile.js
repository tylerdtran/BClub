/*
import './App.css';
import React from 'react';
import { auth, db } from '../Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, get, update } from "firebase/database";
import { Form, FormGroup, Col, ButtonGroup, Button, Card, Toast, ToastContainer } from 'react-bootstrap'


function Profile(){

	const [user, loading, error] = useAuthState(auth);
    const [validated, setValidated] = useState(false);
    const preferences = ref(db, "user-preferences/" + user.uid); // get author pref
    const [affil, setAffil] = useState("");
    const [classYear, setClassYear] = useState("");
    const [showSave, setShowSave] = useState(false);
    const [disabled, setDisabled] = useState(false);

	const start = 1950;
    const end = 2030;
    let classes = [...Array(end - start + 1).keys()].map(x => x + start);
    classes.reverse();

	useEffect(() => {
        get(preferences).then((snapshot) => {
            if (snapshot.exists()) {
                setAffil(snapshot.val().affiliation);
                setClassYear(snapshot.val().classYear);
                console.log(affil + " " + classYear);
            }
        }).catch((error) => { console.log(error) });
    }, []);

	const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const key = auth.currentUser.uid;
            let newPref = {
                affiliation: affil,
                classYear: classYear
            };
            const updates = {};
            updates['/user-preferences/' + key] = newPref;
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
		<Card>
			<Card.Body>
				<ToastContainer className="p-3" position="top-center">
					<Toast onClose={() => setShowSave(false)} show={showSave} delay={3000} autohide bg="secondary">
						<Toast.Body>Updates saved.</Toast.Body>
					</Toast>
				</ToastContainer>

				<Card.Title>Hello {user.email}!</Card.Title>
				<hr />
				<Card.Text>Update account information</Card.Text>
				<Col md={4}>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<FormGroup className="mb-3">
							<Form.Select required value={affil} onChange={(e) => { setAffil(e.target.value) }}>
								<option value="">Select your affiliation...</option>
								<option value="UCLA Sorority">UCLA Sorority</option>
								<option value="UCLA Fraternity">UCLA Fraternity</option>
								<option value="UCLA Student">UCLA Student (not affiliated with Greek life)</option>
								<option value="Non-UCLA Sorority">Non-UCLA Sorority</option>
								<option value="Non-UCLA Fraternity">Non-UCLA Fraternity</option>
								<option value="Non-UCLA Student">Non-UCLA Student (not affiliated with Greek life)</option>
							</Form.Select>
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
	);
}

export default { Profile };
*/