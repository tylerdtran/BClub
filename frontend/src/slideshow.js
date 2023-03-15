import React from 'react';
import './slideshow.css';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function Slides() {
  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='bbsa.png'
        alt='...'
        
      >
        <h5>Black Business Student Association</h5>
        <p>The Black Business Student Association is the premier black professional organization and business network at UCLA committed to empowering students through professional development, mentorship, entrepreneurship, and career networking opportunities.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src="fgc.png"
        alt='...'
      >
        <h5>Fighting Game Community</h5>
        <p>A community dedicated to sharing and cultivating interest in the video game genre of fighting games. Meetups, tournaments, and socials are held every week. We play a vast variety of fighting games, ranging from Street Fighter, Guilty Gear, Tekken, and more!</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='asce.jpeg'
        alt='...'
      >
        <h5>American Society of Civil Engineers</h5>
        <p>The American Society of Engineers Student Chapter at UCLA (ASCE at UCLA) is a student run organization primarily interested in developing the young engineer with an emphasis in civil engineering.</p>
      </MDBCarouselItem>
      </MDBCarousel>
  );
}