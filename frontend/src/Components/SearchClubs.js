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
                snapshot.forEach(function(childSnapshot) {
                clubNames.push({ name: childSnapshot.val().name, value: childSnapshot.val().url })
            });
        }
        setOptionList(clubNames);
    }).catch((error) => {console.log(error)})}, [doNotUpdate]);

    console.log(optionList);

    const handleSelect = (selectedValue) => {
        if (props.handleSelect)
        {
            props.handleSelect(selectedValue);
        }
        if (props.nav == "redirect")
        {
            nav(`/clubs/${selectedValue}`);
        }
    }

    return (
        <Form>
            <SelectSearch
                options={optionList} 
                onChange={handleSelect}
                value={value} 
                name="clubs" 
                placeholder="Search"/>
        </Form>
    );
}