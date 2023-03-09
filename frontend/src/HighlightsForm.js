import React, { useState } from "react";
import { db } from "./Firebase";
import { ref, set, push } from "firebase/database";

export default function HighlightsForm() {
    const [highlightLink, setHighlightLink] = useState("");
    const [socialMedia, setSocialMedia] = useState("");

    const highlightForm = (e) => {
      e.preventDefault();
      const path = "/highlights/" + socialMedia
      const highlightRef = ref(db, path);
      const newHighlightRef = push(highlightRef);
      set(newHighlightRef, {
        link: highlightLink
      })
      .catch((error) => { 
        console.log(error);
      }) 
    }

    return (
    <div> 
      <form onSubmit={highlightForm}>
        <h1>Submit a Highlight</h1>
        <input type="text" placeholder="Highlight Link" value={highlightLink} onChange={(e) => setHighlightLink(e.target.value)}></input>
        <select value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)}>
            <option value="" disabled selected>Select social media</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Pinterest">Pinterest</option>
            <option value="TikTok">TikTok</option>
            <option value="Twitter">Twitter</option>
            <option value="YouTube">YouTube</option>  
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
    );
}