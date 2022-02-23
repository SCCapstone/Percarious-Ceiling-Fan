import React from 'react';
import Plot from 'react-plotly.js';
import { withRouter } from "react-router";
import axios from "axios"; //for SQL command stuff

class Results extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {data: [], layout: {}, frames: [], config: {}, results: [], chart: ""};
	}

	componentDidMount = () => {
		if(this.props.location !== undefined) {
			console.log(this.props.location.search);
			console.log(this.props.location.field);
			console.log(this.props.location.chart);
			this.setState({chart: this.props.location.chart})
			this.getBasicResults();
			}
	}

	getBasicResults = () => {
		axios.get('http://localhost:3001/basicSearch',{
			params: {
				search: this.props.location.search.substring(1),
				field: this.props.location.field
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response})}) //results from basicSearch
	};

    render(){
        return (
			<>
		
			<div> <h3>Search Output:</h3> </div>
			<Plot 
			data={
					[{
						x: Object.keys(this.state.results),
						y: Object.values(this.state.results),
						type: this.state.chart,
						marker: {color: 'blue'}
					}]
				}
			layout={{title: 'Results'}}
			/>
			</>
			
		)
    }
}
export default withRouter(Results);
