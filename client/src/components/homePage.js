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
			<div>
			<div className="ui input">
			<input value={this.state.example} onChange={e => this.setState({ example: e.target.value})} placeholder="Search"/>
			</div>
			<button className= "ui large primary button" onClick={() => this.onSubmitClick()}>Add</button>
			</div>
		)
	}
};

export default HomePage