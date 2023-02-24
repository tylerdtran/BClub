import './App.css';
import React from 'react';

function DarkModeButton({value, handlerFunction}){
  return(
    <button className="darkModeButton" onClick={handlerFunction}> {value} </button>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "Switch to Dark Mode",
    }
  }

  handleClick() {
    // Set light mode dynamic colors
    if (this.state.mode === "Switch to Light Mode"){
      this.setState({
        mode: "Switch to Dark Mode",
      });
      document.documentElement.style.setProperty('--dynamic-bg', "#fafafa");
      document.documentElement.style.setProperty('--dynamic-text-color', "#666");
      document.documentElement.style.setProperty('--dynamic-bruin-blue', "rgb(26, 108, 184)");
      document.documentElement.style.setProperty('--dynamic-lighter-blue', "rgb(98, 158, 214)");
      document.documentElement.style.setProperty('--dynamic-lightest-blue', "rgb(171, 205, 238)");
    }
    // Set dark mode dynamic colors
    else {
      this.setState({
        mode: "Switch to Light Mode",
      });
      document.documentElement.style.setProperty('--dynamic-bg', "#333333");
      document.documentElement.style.setProperty('--dynamic-text-color', "#fafafa");
      document.documentElement.style.setProperty('--dynamic-bruin-blue', "rgb(98, 158, 214)");
      document.documentElement.style.setProperty('--dynamic-lighter-blue', "rgb(26, 108, 184)");
      document.documentElement.style.setProperty('--dynamic-lightest-blue', "rgb(19, 61, 104)");
    }
  }

  render() {
    return (
      <>
      <meta charSet="utf-8" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet"></link>
      <header>
        <a href="index.html">
          <img id="logo" src="logo.png" alt="BClub Logo" />
        </a>
        <br />
        <br />
        <br />
        <h3>
          <DarkModeButton value={this.state.mode} handlerFunction={() => this.handleClick()}/>
          <input type="text" name="searchBar" id="searchBar" placeholder="Search"></input>
          Welcome Bruin! | Sign In | Register
        </h3>
      </header>
      <nav id="nav_menu">
        <ul>
          <li>
            <a href="index.html" className="current">
              Home
            </a>
          </li>
          <li>
            <a href="catalog.html">Club Catalog</a>
          </li>
          <li>
            <a href="calendar.html">Event Calendar</a>
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
      </nav>
      <main>
        <section className="featureSection">
          <h2>Club Spotlight</h2>
          <h3>
            Genshin Impact at UCLA
          </h3>
            <div className="featurePhoto">
              <figcaption>Genshin Theme Song Jeopardy Event - February 7, 2023</figcaption>
              <img
                src="featuredevent.jpg"
                alt="Featured Event"
              />
              </div>
          <p>
            With an active community of over 400 UCLA students and alumni, Genshin
            Impact at UCLA is the place to be to connect with your fellow
            Travelers! Featuring a Discord server with hundreds of daily messages
            and frequent social events, including weekly picnics, there's always people to meet and fun to
            be had!
            <br />
            <br />
            <a href="https://discord.gg/FpvRw77U9d">
              Join us on Discord!
            </a>
            <br />
            <br />
            <a href="http://localhost:3000">
              View this club's page on BClub
            </a>
          </p>
        </section>
        <aside className="APIs">
          <div className="eventSection">
            <h2>Upcoming Events</h2>
            <h3>
              Place Google Calendar API here
            </h3>
          </div>
          <div className="photoSection">
            <h2>Photos</h2>
            <h3>
              Place Instagram API here
            </h3>
          </div>
        </aside>
      </main>
      <footer>
        <p>© 2023 BClub</p>
      </footer>
    </>
    );
  }
}