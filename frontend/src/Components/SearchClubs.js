import React, {useState, useEffect} from "react";

function SearchClubs(props) {

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);

    useEffect(() => {
        // in the event that they actually type something in the textbox
        if (value.length > 0) {
            fetch("link of the realtime database").then(
                response => response.json()
            ).then(responseData => {
                setResult([])
                let searchQuery = value.toLowerCase();
                for(const key in responseData) {
                    let club = responseData[key].name.toLowerCase()
                    if (club.slice(0, searchQuery.length).indexOf(searchQuery) !== -1)
                    {
                         setResult((prevResult => {
                            return [...prevResult, responseData[key].name]
                         }))
                    }
                }
            }).catch(error => {
                console.log(error);
                
            })
        }
        else {
            setResult([]);
        }
    }, [value])

    return (
        <div>
            <p className="titleText">Search Clubs</p>
            <input type="text"
            className="searchBar"
            onChange={(event) => setValue(event.target.value)}
            value={value}
            />
            <div className="searchBack">
                <div className="searchEntry">
                    {result.map((result, index) => (
                        <a href="#" key={index} >
                            <div className="searchEntry">
                                {result}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchClubs;