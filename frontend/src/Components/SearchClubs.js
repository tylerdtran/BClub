import React, { useState, useEffect } from 'react'
import SelectSearch from 'react-select-search';
import { Form } from "react-bootstrap";
import { ref, get } from "firebase/database";
import { db } from '../Firebase';
import { useNavigate } from "react-router-dom";
import 'react-select-search/style.css'

export default function SearchClubs(props) {
    const [optionList, setOptionList] = useState([]);
    const value = props.value != null ? props.value : "";
    const clubList = ref(db, 'clubs');
    const doNotUpdate = 0;
    const nav = useNavigate();
    
    useEffect(() => {get(clubList).then((snapshot) => {
        let clubNames = [];
        if (snapshot.exists()) {
            // must be a name and val for select search to recognize
                snapshot.forEach(function(childSnapshot) {
                clubNames.push({ 
                    name: childSnapshot.val().name, 
                    value: childSnapshot.val().url })
            });
        }
        setOptionList(clubNames);
    }).catch((error) => {console.log(error)})}, [doNotUpdate]);

    console.log(optionList);

    const handleChosen = (chosenLink) => {
        if (props.handleChosen)
        {
            props.handleChosen(chosenLink);
        }
        if (props.nav == "redirect")
        {
            nav(`/clubs/${chosenLink}`);
        }
    }

    return (
        <Form>
            <SelectSearch
                options={optionList} 
                onChange={handleChosen}
                value={value} 
                name="clubs" 
                placeholder="Search"/>
        </Form>
    );
}