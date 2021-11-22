import React from 'react';
import axios from "axios"; //for SQL command stuff

class AdvancedSearch extends React.Component{
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
	sendSearch = () => {}


	render() {
		return (
		<>
		<title>Advanced Search</title>
		<body>
			<div id="search list">
				<div attribute="searchTerms">
					
				</div>
				<div attribute="searchTerms">
					<p attribute="searchPrompt">Any of these words:</p>
					<input attribute = "searchInput" id= "anyWords"></input>
				</div>
				<div attribute="searchTerms">
					<p attribute="searchPrompt">Exact words or phrases</p>
					<input attribute = "searchInput"></input>
				</div>
				<div attribute="searchTerms">
					<p attribute="searchPrompt">None of these words:</p>
					<input attribute = "searchInput"></input>
				</div>
				<div attribute="searchTerms">
					<p attribute="searchPrompt">Tags to query:</p>
					<input attribute = "searchInput"></input>
				</div>
				<div attribute="searchTerms">
					<p attribute="searchPrompt">Year range</p>
					<input attribute = "searchInput"></input>
					<p attribute = "searchPrompt">to</p>
					<input attribute = "searchInput"></input>
				</div>
				<div attribute="searchTerms">
					<p attribute="searchPrompt">Languages:</p>
					<input attribute = "searchInput"></input>
				</div>
				<div attribute="searchTerms">
					<p attribute="searchPrompt">Region:</p>
					<input attribute = "searchInput"></input>
				</div>
			</div>
			<div id="search button">
				<button>Search</button>
			</div>
		</body>
			</>
		)
	}
};

export default AdvancedSearch;