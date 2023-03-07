import './App.css';
import React from 'react';
import {Link} from "react-router-dom";
import AuthDetails from './LoginComponents/AuthDetails';

function DarkModeButton({value, handlerFunction}){
    return(
    	<button className="darkModeButton" onClick={handlerFunction}> {value} </button>
    );
}
  
export default class Header extends React.Component {
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
			document.documentElement.style.setProperty('--dynamic-dark-text-color', "#222");
        	document.documentElement.style.setProperty('--dynamic-bruin-blue', "rgb(26, 108, 184)");
        	document.documentElement.style.setProperty('--dynamic-lighter-blue', "rgb(98, 158, 214)");
        	document.documentElement.style.setProperty('--dynamic-lightest-blue', "rgb(171, 205, 238)");
			// For calendar page
			document.documentElement.style.setProperty('--dynamic-events-header', "beige");
      	}
    	// Set dark mode dynamic colors
    	else {
        	this.setState({
        		mode: "Switch to Light Mode",
        	});
        	document.documentElement.style.setProperty('--dynamic-bg', "#333333");
        	document.documentElement.style.setProperty('--dynamic-text-color', "#fafafa");
			document.documentElement.style.setProperty('--dynamic-dark-text-color', "#fff");
        	document.documentElement.style.setProperty('--dynamic-bruin-blue', "rgb(98, 158, 214)");
        	document.documentElement.style.setProperty('--dynamic-lighter-blue', "rgb(26, 108, 184)");
        	document.documentElement.style.setProperty('--dynamic-lightest-blue', "rgb(19, 61, 104)");
			// For calendar page
				document.documentElement.style.setProperty('--dynamic-events-header', "rgb(102, 91, 54)");
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
              		<AuthDetails />
            		</h3>
          		</header>
          		<nav id="nav_menu">
            		<ul>
              			<li>
							<Link to="/">Home</Link>
              			</li>
              			<li>
							<Link to="/catalog">Club Catalog</Link>
              			</li>
              			<li>
                			<Link to="/calendar">Event Calendar</Link>
              			</li>
              			<li>
                			<Link to="/feedback">Feedback</Link>
              			</li>
              			<li className="lastitem">
                			<Link to="/account">My Account</Link>
                			<ul>
                  				<li>
                    				<Link to="/myclubs">My Clubs</Link>
                  				</li>
                  				<li>
                    				<Link to="/myprofile">My Profile</Link>
                  				</li>
                			</ul>
              			</li>
            		</ul>
        		</nav>
        	</>
    	);
	}
}