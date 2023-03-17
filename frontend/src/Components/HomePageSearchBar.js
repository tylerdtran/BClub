// Club Searching function 
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ref, get } from "firebase/database";
import { db } from '../Firebase';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

function HomePageSearchBar(props) {
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
        // <div>
        //     <input type="text"
        //     className="searchBar"
        //     onChange={(event) => setValue(event.target.value)}
        //     value={value}
        //     />
        //     <div className="searchBack">
        //         <div className="searchEntry">
        //             {result.map((result, index) => (
        //                 <a onClick={nav(`/clubs/${}`)} key={index}>
        //                     <div className="searchEntry">
        //                         {result}
        //                     </div>
        //                 </a>
        //             ))}
        //         </div>
        //     </div>
        // </div>
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

export { HomePageSearchBar };