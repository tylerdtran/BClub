import React, { useState } from "react";
import { db } from "./Firebase";
import { ref, set, push } from "firebase/database";
import './Clubs.css'

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
        <form className="clubForm" onSubmit={clubForm}>
            <h1>Create a Club</h1>

            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubName">Club Name: </label>
              <input className="clubFormInput" id="clubName" type="text" required placeholder="Club Name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>

            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubNickname">Club Nickname: </label>
              <input className="clubFormInput" id="clubNickname" type="text" placeholder="Club Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
            </div>

            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubAffiliations">Outside Affiliations: </label>
              <input className="clubFormInput" id="clubAffiliations" type="text" placeholder="Outside Affilations" value={outside_affil} onChange={(e) => setOutside_Affil(e.target.value)}></input>
            </div>

            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubFacebook">Club Facebook Page: </label>
              <input className="clubFormInput" id="clubFacebook" type="text" placeholder="Facebook URL" value={facebook} onChange={(e) => setFacebook(e.target.value)}></input>
            </div>
            
            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubInstagram">Club Instagram Page: </label>
              <input className="clubFormInput" id="clubInstagram" type="text" required placeholder="Instagram URL" value={instagram} onChange={(e) => setInstagram(e.target.value)}></input>
            </div>
            
            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubTwitter">Club Twitter Page: </label>
              <input className="clubFormInput" id="clubTwitter" type="text" placeholder="Twitter URL" value={twitter} onChange={(e) => setTwitter(e.target.value)}></input>
            </div>

            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubDescription">Club Description: </label>
              <textarea className="clubFormInput" id="clubDescription" required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            
            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubURL">Desired BClub URL: </label>
              <input className="clubFormInput" id="clubURL" type="text" required placeholder="Desired BClub URL" value={url} onChange={(e) => setURL(e.target.value)}></input>
            </div>

            <div className="clubFormItem">
              <label className="clubFormLabel" for="clubSite">External Club Website: </label>
              <input className="clubFormInput" id="clubSite" type="text" placeholder="External Club Website URL" value={website} onChange={(e) => setWebsite(e.target.value)}></input>
            </div>

            <div className="clubFormItem">
              <label className="clubFormLabel" for="categorySelect">Category: </label>
              <select className="clubFormInput" id="categorySelect" required value={club_type} onChange={(e) => setClub_Type(e.target.value)}>
                <option value="" disabled selected>Select a category...</option>
                <option value="academic">Academic</option>
                <option value="arts">Arts</option>
                <option value="career">Career</option>
                <option value="community service">Community Service</option>
                <option value="cultural">Cultural</option>
                <option value="techological">Technological</option>
                <option value="recreational">Recreational</option>
                <option value="other">Other</option>  
              </select>
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}