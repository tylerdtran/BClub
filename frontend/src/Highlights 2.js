import React from "react";
import './Highlights.css'
import { FacebookEmbed,
         InstagramEmbed,
         LinkedInEmbed,
         PinterestEmbed,
         TikTokEmbed,
         TwitterEmbed,
         YouTubeEmbed } from 'react-social-media-embed';
import { db } from "./Firebase";
import { ref, onChildAdded } from "firebase/database";

function returnSocialMediaLinks(socialMedia) {
    const path = "/highlights/" + socialMedia;
    const highlights = [];
    const highlightsRef = ref(db, path);

    onChildAdded(highlightsRef, (data) => {
        highlights.push(data.val().link);
    });
    return highlights;
}

function Posts(props) {
    const links = returnSocialMediaLinks(props.socialMedia);
    const postsList = links.map((links) => 
    {if(props.socialMedia=="Facebook") {
        return (
            <div className="squares">
                <FacebookEmbed url={links}/>
            </div>
        );
    }
    else if(props.socialMedia=="Instagram") {
        return (
            <div className="squares">
                <InstagramEmbed url={links}/>
            </div>
        );
    }
    else if(props.socialMedia=="LinkedIn") {
        return (
            <div className="squares">
                <LinkedInEmbed url={links}/>
            </div>
        );
    }
    else if(props.socialMedia=="Pinterest") {
        return (
            <div className="squares">
                <PinterestEmbed url={links}/>
            </div>
        );
    }
    else if(props.socialMedia=="TikTok") {
        return (
            <div className="squares">
                <TikTokEmbed url={links}/>
            </div>
        );
    }
    else if(props.socialMedia=="Twitter") {
        return (
            <div className="squares">
                <TwitterEmbed url={links}/>
            </div>
        );
    }
    else if(props.socialMedia=="YouTube") {
        return (
            <div className="squares">
                <YouTubeEmbed url={links}/>
            </div>
        );
    }});
    return (
        <div>
            <h2>{props.socialMedia}</h2>
            <div className="horizontal-scroll-wrapper">
                {postsList}
            </div>
        </div>
    );
}

export default function Highlights() {
    const socialMedias = ["Facebook", "Instagram", "LinkedIn", "Pinterest","TikTok", "Twitter", "YouTube"];

    const highlights = socialMedias.map((socialMedia) => <Posts socialMedia={socialMedia}/>);
    return <><h1>Highlights!</h1><div>{highlights}</div></>;
}
