import React from 'react';
import axios from "axios"; //for SQL command stuff

class HomePage extends React.Component{
	state = {
		connection: "",
		search: ""
	}

	componentDidMount() {
		console.log('this runs');
	}

	onSubmitClick = () => {
		axios.post('http://localhost:3001/basicSearch',{ //TO DO
			search: this.state.search
		})
		this.getBasicSearchResult();
	}

	//get the results and round them to results page here
	getBasicSearchResult = () => {
		axios.get('http://localhost:3001/basicSearch')
		.then((response) => response.data)
		.then(response => {this.setState({connection: response})}) //placeholder, TODO
};

	render() {
		return (
			<div>
				<div class="content-wrapper">
      			<div class="nav-bar-wrapper">
        		<div class="menu-icon"></div>
        <p class="header">Home</p>
      </div>
      <div class="main-body">
        <h1>Welcome to The Precarious Search System</h1>
      </div>
	  <div className="ui input">
			<input value={this.state.search} onChange={e => this.setState({ search: e.target.value})} placeholder="Search"/> 
			</div>
			<button className= "ui large primary button" onClick={() => this.onSubmitClick()}>Search</button>
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
};

export default HomePage