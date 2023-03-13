import React, { useState } from "react";
import { db } from "./Firebase";
import { ref, set } from "firebase/database";

export default function ClubsForm() {
    const [clubType, setClubType] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [overallRating, setOverallRating] = useState("");
    const [nickname, setNickname] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [website, setWebsite] = useState("");
    const [url, setURL] = useState("");

    const clubForm = (e) => {
      e.preventDefault();
      const path = "/clubs/" + url;
      const clubRef = ref(db, path);
      set(clubRef, {
        clubType: clubType,
        description: description,
        name: name,
        nickname: nickname,
        overallRating: 0,
        rating: [1, 1, 1, 1],
        socials:{
          Facebook: facebook,
          Instagram: instagram,
        },
        website: website,
        url: url,
        createdAt: new Date().getTime()
      })
      .then(() =>{
      alert('Club data submitted');
      window.location.reload();
      })
      .catch((error) => { 
        console.log(error);
      }) 
    }
    return (
        <div> 
        <form onSubmit={clubForm}>
            <h1>Submit a Club</h1>
            <input type="text" required placeholder="Club Name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input type="text" placeholder="Club Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
            <input type="text" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)}></input>
            <input type="text" required placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)}></input>
            <input type="text" required placeholder="OverallRating" value={overallRating} onChange={(e) => setOverallRating(e.target.value)}></input>
            <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <input type="text" required placeholder="URL" value={url} onChange={(e) => setURL(e.target.value)}></input>
            <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)}></input>
            <select required value={clubType} onChange={(e) => setClubType(e.target.value)}>
                <option value="" disabled selected>Select a Category</option>
                <option value="academic">Academic</option>
                <option value="arts">Arts</option>
                <option value="career">Career</option>
                <option value="community service">Community Service</option>
                <option value="cultural">Cultural</option>
                <option value="techological">Technological</option>
                <option value="recreational">Recreational</option>
                <option value="other">Other</option>  
            </select>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}