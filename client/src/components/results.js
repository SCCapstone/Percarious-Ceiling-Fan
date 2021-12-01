import React from 'react';
import Plot from 'react-plotly.js';
import { withRouter } from "react-router";
import axios from "axios"; //for SQL command stuff

class Results extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {data: [], layout: {}, frames: [], config: {}, results: []};
	}

	componentDidMount = () => {
		console.log('reached');
		if(this.props.location !== undefined) {
			console.log('reached, not undefined');
			console.log(this.props.location.state);
			this.getResults();
			}
	}

	getResults = () => {
		axios.get('http://localhost:3001/basicSearch',{
			params: {
				search: this.props.location.state
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response})}) //results from basicSearch
	};

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
export default withRouter(Results);
