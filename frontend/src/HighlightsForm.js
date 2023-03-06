import React, { useState } from "react";
import { database } from "./Firebase";
import { ref, set } from "firebase/database";

export default function HighlightsForm() {
    const [highlightLink, setHighlightLink] = useState("");
    const [socialMedia, setSocialMedia] = useState("");

    const highlightForm = (e) => {
      e.preventDefault();
      set(ref(database), {
        link: highlightLink,
        social_media: socialMedia
      })
      .catch((error) => { 
        console.log(error);
      }) 
    }

    return (
    <div className="Highlight-Container"> 
      <form onSubmit={highlightForm}>
        <h1>Submit a Highlight</h1>
        <input type="text" placeholder="Highlight Link" value={highlightLink} onChange={(e) => setHighlightLink(e.target.value)}></input>
        <select placeholder="Choose a Social Media" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)}>
            <option value="" disabled selected>Select social media</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="pinterest">Pinterest</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">Twitter</option>
            <option value="youtube">YouTube</option>  
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
    );
}