import React, { useState } from "react";
import { db } from "./Firebase";
import { ref, set, push } from "firebase/database";

export default function ClubsForm() {
    const [club_type, setClub_Type] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [outside_affil, setOutside_Affil] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [website, setWebsite] = useState("");
    const [url, setURL] = useState("");

    const clubForm = (e) => {
      e.preventDefault();
      const path = "/Clubs/" + name;
      const clubRef = ref(db, path);
      set(clubRef, {
        Club_Type: club_type,
        Description: description,
        Name: name,
        Nickname: nickname,
       Outside_Affil: outside_affil,
        Overall_Rating: {
          Activeness: "",
          Community: "",
          Competitiveness: "",
          Fun: "",
          Involvement: ""
        },
        Socials:{
          Facebook: facebook,
          Instagram: instagram,
          Twitter: twitter
        },
        Website: website,
        URL: url,
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
            <input type="text" placeholder="Outside Affilations" value={outside_affil} onChange={(e) => setOutside_Affil(e.target.value)}></input>
            <input type="text" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)}></input>
            <input type="text" required placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)}></input>
            <input type="text" placeholder="Twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)}></input>
            <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <input type="text" required placeholder="URL" value={url} onChange={(e) => setURL(e.target.value)}></input>
            <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)}></input>
            <select required value={club_type} onChange={(e) => setClub_Type(e.target.value)}>
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