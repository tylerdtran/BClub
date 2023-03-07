import React from "react";
import { FacebookEmbed } from 'react-social-media-embed';
import { InstagramEmbed } from 'react-social-media-embed';
import { LinkedInEmbed } from 'react-social-media-embed';
import { PinterestEmbed } from 'react-social-media-embed';
import { TikTokEmbed } from 'react-social-media-embed';
import { TwitterEmbed } from 'react-social-media-embed';
import { YouTubeEmbed } from 'react-social-media-embed';

function Post({ link, socialMedia }) {
    if(socialMedia=="facebook") {
        return(<FacebookEmbed url={link} />);
    }
    else if(socialMedia=="instagram") {
        return(<InstagramEmbed url={link} />);
    }
    else if(socialMedia=="linkedin") {
        return(<LinkedInEmbed url={link} />);
    }
    else if(socialMedia=="pinterest") {
        return(<PinterestEmbed url={link} />);
    }
    else if(socialMedia=="tiktok") {
        return(<TikTokEmbed url={link}  />);
    }
    else if(socialMedia=="twitter") {
        return(<TwitterEmbed url={link} />);
    }
    else if(socialMedia=="youtube") {
        return(<YouTubeEmbed url={link} />);
    }
}

export default function Highlights() {
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
}