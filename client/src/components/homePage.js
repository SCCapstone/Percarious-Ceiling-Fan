import React from 'react';
import axios from "axios"; //for SQL command stuff

class HomePage extends React.Component{
	state = {
		connection: "",
		search: "",
		results: []
	}

	componentDidMount() {
		console.log('this runs');
	}

	onSubmitClick = () => {
		axios.get('http://localhost:3001/basicSearch',{
			params: {
				search: this.state.search
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response})}) //results from basicSearch

		//need to route to results page with this.results info
	}

	render() {
		console.log(this.state.search);
		let inputStylingBasic = {
			backgroundColor:  '#FFFFFF',
			textAlign: 'center',
			fontSize: '120',
			height:'50px',
			width:'300px',
			outlineStyle:'none',
			border: 'none',
			borderRadius: '20px',
			color: 'black'
		}

		let inputStylingAdvanced = {
			backgroundColor:  '#6675b0',
			textAlign: 'center',
			fontSize: '120',
			height:'50px',
			width:'300px',
			outline: 'none',
			borderRadius: '20px',
			color: '#FFFFFF',
			outlineStyle:'none',
			border: 'none'
		}
		let buttonStyling = {
			padding: '1px',
			outline: 'none',
			margin: '10px'
		}
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
					<div class="ui-input">
						<input style = {inputStylingBasic} value={this.state.search} onChange={e => this.setState({ search: e.target.value})} placeholder="Enter your Search Here"/> 
					</div>
					<button style= {buttonStyling} class = "ui-large-primary-button" onClick={() => this.onSubmitClick()}>Search</button>
					<div class="decor">
							<p>OR</p>
					</div>
					<div class="ui-input">
						<input style = {inputStylingAdvanced} value={this.state.search} onChange={e => this.setState({ search: e.target.value})} placeholder="Use Advanced Search" placeholderTextColor = "#FFFFFF"/> 
					</div>
					<button style= {buttonStyling} class = "ui-large-primary-button" onClick={() => this.onSubmitClick()}>Search</button>
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