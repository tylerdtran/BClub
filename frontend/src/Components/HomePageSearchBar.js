// Club Searching function 
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ref, get } from "firebase/database";
import { db } from '../Firebase';
import Select from 'react-select';
import 'react-select-search/style.css';

function HomePageSearchBar(props) {
    const [optionList, setOptionList] = useState([]);
    const value = props.label != null ? props.label : "";
    const clubList = ref(db, 'clubs');
    const doNotUpdate = 0;
    const nav = useNavigate();
    
    useEffect(() => {get(clubList).then((snapshot) => {
        let clubNames = [];
        if (snapshot.exists()) {
            // let data = snapshot.val();
                snapshot.forEach(function(childSnapshot) {
                clubNames.push({ 
                    value: childSnapshot.val().url,
                    label: childSnapshot.val().name, 
                    })
            });
        }
        setOptionList(clubNames);
    }).catch((error) => {console.log(error)})}, [doNotUpdate]);

    console.log(optionList);

    const handleSelect = (selectedValue) => {
        console.log(selectedValue)
        if (props.handleSelect)
        {
            props.handleSelect(selectedValue);
        }
        if (props.nav === "redirect")
        {
            console.log(selectedValue.value);
            nav(`/clubs/${selectedValue.value}`);
        }
    }

    return (
        <Form>
            <Select
                options={optionList} 
                onChange={handleSelect}
                value={value} 
                name="clubs" 
                placeholder="Search"/>
        </Form>
    );
}
export { HomePageSearchBar };

    // const [value, setValue] = useState('');
    // const [result, setResult] = useState([]);

    // useEffect(() => {
    //     // in the event that they actually type something in the textbox
    //     if (value.length > 0) {
    //         fetch("https://bclub-b0d3f-default-rtdb.firebaseio.com/clubs.json").then(
    //             response => response.json()
    //         ).then(responseData => {
    //             setResult([])
    //             let searchQuery = value.toLowerCase();
    //             for(const key in responseData) {
    //                 let club = responseData[key].name.toLowerCase()
    //                 if (club.slice(0, searchQuery.length).indexOf(searchQuery) !== -1)
    //                 {
    //                      setResult((prevResult => {
    //                         return [...prevResult, responseData[key].name]
    //                      }))
    //                 }
    //             }
    //         }).catch(error => {
    //             console.log(error);
                
    //         })
    //     }
    //     else {
    //         setResult([]);
    //     }
    // }, [value])