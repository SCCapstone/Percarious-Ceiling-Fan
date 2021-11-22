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
				<div attribute="search terms"></div>
				<div attribute="search terms"></div>
				<div attribute="search terms"></div>
				<div attribute="search terms"></div>
				<div attribute="search terms"></div>
				<div attribute="search terms"></div>
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