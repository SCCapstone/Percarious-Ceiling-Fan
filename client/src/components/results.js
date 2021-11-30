import React from 'react';
import axios from "axios"; //for SQL command stuff
import Plot from 'react-plotly.js';

class Results extends React.Component{
    state = {
        connection: "",
		resultArray: this.props.location.state //this should access the results sent from basic search
    }

    componentDidMount() {
		console.log('this runs');
		this.getConnectionTest();
	}

    getConnectionTest = () => {
		axios.get('http://localhost:3001/')
		.then((response) => response.data)
		.then(response => {this.setState({connection: response})})
	}
	
	constructor(props){
		super(props);
		this.state = {data: [], layout: {}, frames: [], config: {}};
	}

    render(){
        return (
			<Plot 
			data={this.state.date}
			layout={this.state.layout}
			frames={this.state.frames}
			config={this.state.config}
			onInitialized={(figure) => this.setState(figure)}
			onUpdate={(figure)=> this.setState(figure)}
			/>
		)
    }
}
export default Results;
