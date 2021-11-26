import React from 'react';
import axios from "axios"; //for SQL command stuff

function getDecades(data){
	decades = {};
	for(let i = 0; i < data.length; i++){
		year = data[i].control_string.substring(7,11);
		dec = Math.trunc(year/10)*10;
		if(!decades[dec]) decades[dec] = 0;
		decades[dec]++;
	}
	return decades;
}

class Results extends React.Component{
    state = {
        connection: ""
    }

    componentDidMount() {
		console.log('this runs');
		this.getConnectionTest();
	}

    getConnectionTest = () => {
		axios.get('http://localhost:3001/')
		.then((response) => response.data)
		.then(response => {this.setState({connection: response})})
	};

    render(){
        return (
			<div>
				<div class="content-wrapper">
					<div class="nav-bar-wrapper">
						<div class="menu-icon"></div>
						<p class="header">Results Page</p>
					</div>
					<div class="main-body">
						<h1>Welcome to The Precarious Search System</h1>
					</div>


					<div class="bottom-nav-bar">
						<div class="left-side">
							<p class="goal-header">Our goal:</p>
							<p>blah blah blah info info info</p>
						</div>
						<div class="right-side">
							<p class="contact-header">Contact Us:</p>
							<p>#2709 : testEmail@gmail.com</p>
							<p>#</p>
						</div>
					</div>
    			</div>
			</div>
		)
    }
}
export default Results;
