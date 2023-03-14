import './App.css';
import React from 'react';
import AuthDetails from './LoginComponents/AuthDetails';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
					<div id="navBarButtons">
						<ButtonGroup id="nav_menu">
							<Button href="/">
								Home
							</Button>
							<Button href="/catalog">
								Club Catalog
							</Button>
							<Button href="/calendar">
								Club Calendar
							</Button>
							<Button href="/highlights">
								Highlights	
							</Button>
							<Button href="/Profile">
								My Profile
							</Button>
						</ButtonGroup>	
					</div>		
			</>
    	);
	}
}