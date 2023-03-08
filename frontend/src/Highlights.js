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

const socialMedias = ["facebook", "instagram", "linkedin", "pinterest","tiktok", "twitter", "youtube"];

function returnHighlights({ socialMedia }) {
    const path = "/highlights/" + socialMedia;
    const highlights = [];
    const highlightsRef = ref(db, path);

    onChildAdded(highlightsRef, (data) => {
        highlights.push(data.val().link);
    });
    return highlights;
}

function Post({ link, socialMedia }) {
    if(socialMedia=="facebook") {
        return(
            <div className="squares"> 
                <FacebookEmbed url={link} />
            </div>
        );
    }
    if(socialMedia=="instagram") {
        return(
            <div className="squares"> 
                <InstagramEmbed url={link} />
            </div>
        );
    }
    if(socialMedia=="linkedin") {
        return(
            <div className="squares"> 
                <LinkedInEmbed url={link} />
            </div>
        );
    }
    if(socialMedia=="pinterest") {
        return(
            <div className="squares"> 
                <PinterestEmbed url={link} />
            </div>
        );
    }
    if(socialMedia=="twitter") {
        return(
            <div className="squares"> 
                <TikTokEmbed url={link} />
            </div>
        );
    }
    if(socialMedia=="twitter") {
        return(
            <div className="squares"> 
                <TwitterEmbed url={link} />
            </div>
        );
    }
    if(socialMedia=="youtube") {
        return(
            <div className="squares"> 
                <YouTubeEmbed url={link} />
            </div>
        );
    }
    */
}

function SocialMedia({ link, socialMedia }) {
    return (
        <>
            <h2>{ socialMedia }</h2>
            <div className="horizontal-scroll-paper">
                { returnHighlights }
            </div>
        </>
    );
}

export default function Highlights() {
    /*
    return (
        <>
            <h2>Facebook</h2>
            <div className="horizontal-scroll-wrapper"> 
                <div className="squares">
                    <Post link="https://www.facebook.com/UCLA/posts/10160133154795958"
                    socialMedia="facebook"/>
                </div>
                <div className="squares">
                    <Post link="https://www.facebook.com/UCLA/posts/10160134035360958"
                    socialMedia="facebook"/>
                </div>
                <div className="squares">
                    <Post link="https://www.facebook.com/UCLA/posts/10160134339840958"
                    socialMedia="facebook"/>
                </div>
            </div>
            <h2>Instagram</h2>
            <div className="horizontal-scroll-wrapper"> 
                <div className="squares">
                    <Post link="https://www.instagram.com/reel/CpVnexJgg2O/?utm_source=ig_web_copy_link"
                    socialMedia="instagram"/>
                </div>
                <div className="squares">
                    <Post link="https://www.instagram.com/p/CpWi_1UOTCK/?utm_source=ig_web_copy_link"
                    socialMedia="instagram"/>
                </div>
                <div className="squares">
                    <Post link="https://www.instagram.com/p/CpYYlaJtEYE/?utm_source=ig_web_copy_link"
                    socialMedia="instagram"/>
                </div>
            </div>
            <h2>LinkedIn</h2>
            <div className="horizontal-scroll-wrapper"> 
                <div className="squares">
                    <Post link="https://www.linkedin.com/embed/feed/update/urn:li:share:6898694772484112384"
                    socialMedia="linkedin"/>
                </div>
            </div>
            <h2>Pinterest</h2>
            <div className="horizontal-scroll-wrapper"> 
                <div className="squares">
                    <Post link="https://www.pinterest.co.uk/pin/875105771321194304/"
                    socialMedia="pinterest"/>
                </div>
            </div>
            <h2>TikTok</h2>
            <div className="horizontal-scroll-wrapper"> 
                <div className="squares">
                    <Post link="https://www.tiktok.com/@epicgardening/video/7055411162212633903"
                    socialMedia="tiktok"/>
                </div>
            </div>
            <h2>Twitter</h2>
            <div className="horizontal-scroll-wrapper"> 
                <div className="squares">
                    <Post link="https://twitter.com/PixelAndBracket/status/1356633038717923333"
                    socialMedia="twitter"/>
                </div>
            </div>
            <h2>YouTube</h2>
            <div className="horizontal-scroll-wrapper"> 
                <div className="squares">
                    <Post link="https://www.youtube.com/watch?v=HpVOs5imUN0"
                    socialMedia="youtube"/>
                </div>
            </div>
        </>
    );
    */
}