import './App.css';
import LearnMoreButton from './Components/LearnMoreButton';
import React from "react";
// import ReactDOM from "react-dom";

// import Calendar from "./Components/calendar/index.js";

function App() {
  return (
   <>
   
   {/* <meta charSet="utf-8" />
   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet"></link>
   <header>
    <a href="index.html">
      <img id="logo" src="logo.png" alt = "Bclub Logo" />
    </a>

    <br />
    <br />
    <h3 id="largeHeader">
      Welcome Bruin! | Sign In | Register
    </h3>
  </header>
  <nav id="mobile_menu" />
  <nav id="nav_menu">
  <ul>
      <li>
        <a href="index.html">
          Home
        </a>
      </li>
      <li>
        <a href="catalog.html">Club Catalog</a>
      </li>
      <li>
        <a href="calendar.html" className="current">Event Calendar</a>
      </li>
      <li>
        <a href="feedback.html">Feedback</a>
      </li>
      <li className="lastitem">
        <a href="account.html">My Account</a>
        <ul>
          <li>
            <a href="myclubs.html">My Clubs</a>
          </li>
          <li>
            <a href="myprofile.html">My Profile</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav> */}

    <section className='eventsIntroSection'>
      <div className='eventsHeader'>
        <h1>Get Involved!</h1>
        <p className='lineMoveUp'>_________</p>
        <p>UCLA Clubs & Activities</p>
      <LearnMoreButton/>
      </div>
    </section>
    
    <section className='eventsIntroSection'> 
      <div className='eventsHeader2'>
        <h1>1200+ </h1>
        <p>Recognized Student Groups  </p>
        <h1>125+ </h1>
        <p>Volunteer Events  </p>
        <h1>125+ </h1>
        <p>Student Volunteers  </p>
        <h1>50000+  </h1>
        <p>Years of Volunteering Work</p>
        <p>14+</p>
      </div>

    </section>
    <main>

    </main>

   </>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App;
