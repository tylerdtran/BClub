import { auth, provider } from "./Firebase";
import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth"
import { GoogleButton } from "react-google-button";
import { db } from "./Firebase";
import { ref, set, push } from "firebase/database";

export default function GoogleCalendar() {
  const [events, setEvents] = useState([]);
  const [clicked, setClicked] = useState([]);

  function addEvent(title, start, end, description, location, index) {
    const eventsRef = ref(db, 'events');
    const newEventsRef = push(eventsRef);
    set(newEventsRef, {
      title: title,
      start: start,
      end: end,
      description: description,
      location: location
    })
    const newClickedArray = [...clicked];
    newClickedArray[index] = true;
    setClicked(newClickedArray);
  }

  async function GoogleLogIn() {
    try {
      const result = await signInWithPopup(auth, provider);
      const accessToken = result._tokenResponse.oauthAccessToken;
      const calendarID =  result.user.email;
      fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        for(let i = 0; i < data.items.length; i++) {
          setEvents(prevArray => [...prevArray, 
            [data.items[i].summary ?? "", 
            data.items[i].originalStartTime?.date ?? data.items[i].start?.date ?? "",
            data.items[i].end?.date ?? "",
            data.items[i].description ?? "",
            data.items[i].location ?? ""]]);
          setClicked(prevArray => [...prevArray, false]);
        }
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return (
    <div>
        <>
          {events.map((item, index) => (
            <>
              <div className="eventToAdd">
                <p className="eventTitle">Title: {item[0]}</p>
                <p>Start Date: {item[1]}</p>
                <p>End Date: {item[2]}</p>
                <p>Description: {item[3]}</p>
                <p>Location: {item[4]}</p>
                <button onClick={() => addEvent(item[0], item[1], item[2], item[3], item[4], index)} 
                disabled={clicked[index]}>
                  {clicked[index] ? "Event Added" : "Add Event"}
                </button>
              </div>
            </>
          ))}
          <h2 className="eventsFormTitle">Sign in with Google to find Google Calendar events to add!</h2>
          <GoogleButton className="eventsFormGoogleButton" onClick={GoogleLogIn}/>
        </>
    </div>
  );
}