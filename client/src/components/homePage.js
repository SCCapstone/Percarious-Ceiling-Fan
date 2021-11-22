import React from 'react';
import axios from "axios"; //for SQL command stuff

class HomePage extends React.Component{
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
		)
	}
};

export default HomePage