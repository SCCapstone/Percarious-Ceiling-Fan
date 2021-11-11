import React from 'react';
import axios from "axios"; //for SQL command stuff

class HomePage extends React.Component{
	getConnectionTest = () => {
		axios.get('http://localhost:3001/')
		.then((response) => response.data)
		.then(response => {console.log(response)})
};
	render() {
		<div>Hello world from the client side!!</div>
	}
};

export default HomePage