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


	render() {
		return (
		<>
		<title>Advanced Search</title>
		<body>
			<div id="search list">
				<div attribute="search terms">
					
				</div>
				<div attribute="search terms">
					<p attribute="search prompt">Any of these words:</p>
					<input attribute = "search input"></input>
				</div>
				<div attribute="search terms">
					<p attribute="search prompt">Exact words or phrases</p>
					<input attribute = "search input"></input>
				</div>
				<div attribute="search terms">
					<p attribute="search prompt">None of these words:</p>
					<input attribute = "search input"></input>
				</div>
				<div attribute="search terms">
					<p attribute="search prompt">Tags to query:</p>
					<input attribute = "search input"></input>
				</div>
				<div attribute="search terms">
					<p attribute="search prompt">Year range</p>
					<input attribute = "search input"></input>
					<p attribute = "search prompt">to</p>
					<input attribute = "search input"></input>
				</div>
				<div attribute="search terms">
					<p attribute="search prompt">Languages:</p>
					<input attribute = "search input"></input>
				</div>
				<div attribute="search terms">
					<p attribute="search prompt">Region:</p>
					<input attribute = "search input"></input>
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