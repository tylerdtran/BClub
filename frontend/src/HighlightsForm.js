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
        <p className="highlightBlurb">
          <h1>Submit a Highlight</h1>
          Want to promote a social media post from your club? Submit it here!
        </p>
        <div className="highlightFlexbox">
        <input type="text" placeholder="Highlight Link" className="highlightLink" value={highlightLink} onChange={(e) => setHighlightLink(e.target.value)}></input>
        <select className="platformSelect" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)}>
            <option value="" disabled selected>Select social media platform...</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Pinterest">Pinterest</option>
            <option value="TikTok">TikTok</option>
            <option value="Twitter">Twitter</option>
            <option value="YouTube">YouTube</option>  
        </select>
        </div>
        <button type="submit" className="bigButton">Submit</button>
      </form>
    </div>
    );
}