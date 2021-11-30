import React from 'react';
import axios from "axios"; //for SQL command stuff

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
			<h>put stuff here</h>
		)
    }
}
export default Results;
