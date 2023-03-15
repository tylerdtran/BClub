import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import SelectSearch from 'react-select-search';
import fuzzySearch from 'react-select-search';
import { ref, get } from "firebase/database";
import { db } from '../Firebase';
import { useNavigate } from "react-router-dom";

export default function SearchBar(props) {
    const [optionList, setOptionList] = useState([]);
    const value = props.value != null ? props.value : "";
    const clubList = ref(db, 'clubs');
    const doNotUpdate = 0;
    const nav = useNavigate();
    
    useEffect(() => {get(clubList).then((snapshot) => {
        let clubNames = [];
        if (snapshot.exists()) {
            // let data = snapshot.val();
                snapshot.forEach(function(childSnapshot) {
                clubNames.push({ name: childSnapshot.val().name , value: childSnapshot.val().url})
            });
        }
        setOptionList(clubNames);
    }).catch((error) => {console.log(error)})}, [doNotUpdate]);

    const handleSelect = (selectedValue) => {
        if (props.handleSelect)
        {
            props.handleSelect(selectedValue);
        }
        if (props.nav == "redirect")
        {
            nav(`/club/${selectedValue}`);
        }
    }

    return (
        <Form>
            <SelectSearch 
                options={optionList} 
                onChange={handleSelect}
                search 
                filterOptions={fuzzySearch} 
                value={value} 
                name="clubs" 
                placeholder="Search"/>
        </Form>
    );
}