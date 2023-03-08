import React, { useState } from "react";
import { db } from "./Firebase";
import { ref, set, push } from "firebase/database";

export default function ClubsForm() {
    const [clubName, setClubName] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [advisor, setAdvisor] = useState("");
    const [contact, setContact] = useState("");

    const clubForm = (e) => {
      e.preventDefault();
      const path = "/clubs/";
      const clubRef = ref(db, path);
      const newClubRef = push(clubRef);
      set(newClubRef, {
        name: clubName,
        description: description,
        website: website,
        instagram: instagram,
        advisor: advisor,
        contact: contact,
      })
      .catch((error) => { 
        console.log(error);
      }) 
    }
    return (
        <div> 
        <form onSubmit={clubForm}>
            <h1>Submit a Club</h1>
            <input type="text" required placeholder="Club Name" value={clubName} onChange={(e) => setClubName(e.target.value)}></input>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)}></input>
            <input type="text" placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)}></input>
            <input type="text" placeholder="Advisor" value={advisor} onChange={(e) => setAdvisor(e.target.value)}></input>
            <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)}></input>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}