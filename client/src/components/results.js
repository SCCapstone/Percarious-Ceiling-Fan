import React from 'react';
import Plotly from 'react-plotly.js';
import { withRouter } from "react-router";
import axios from "axios"; //for SQL command stuff

class Results extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {data: [], layout: {}, frames: [], config: {}, results: [], chart: ""};
	}

	componentDidMount = () => {
		if(this.props.location !== undefined) {
			console.log(this.props.location.pathname);
			console.log(this.props.location.chart);
			this.setState({chart: this.props.location.chart})
			if(!this.props.location.search){
				console.log(this.props.location.anyWords);
				console.log(this.props.location.exactPhrase);
				console.log(this.props.location.exclude);
				console.log("Author: "+this.props.location.author+" Title: "+this.props.location.title+" Publisher: "+this.props.location.publisher);
				console.log(this.props.location.startYear+" to "+this.props.location.endYear);
				console.log(this.props.location.languages);
				console.log(this.props.location.regions);
				this.getAdvancedResults();
			}
			else {
				console.log(this.props.location.search);
				console.log(this.props.location.field);
				this.getBasicResults();
			}
		}

		console.log('this is running')
		var data, layout, plotlyDiv = document.getElementById('plotlyDiv')
		var check = this.state.chart
		console.log(check + 'from check graph')
		
		if(check === 'bar')
		{
			 data =[{
				x: Object.keys(this.state.results),
				y: Object.values(this.state.results),
				type: this.props.location.chart,
				marker: {color: 'blue'}
			}];
			 layout = {
				title: 'Bar Graph'
			}
			console.log(data + '' + layout)
		}
		if(check === 'line'){
			 data =[{
				x : Object.keys(this.state.results),
				y : Object.values(this.state.results),
				type : this.props.location.chart,
				marker : {color: 'blue'}
			}];
			 layout = {
				title: 'Bar Graph'
			}
			console.log(data + '' + layout)
		}
		else{ //pie chart
			 data =[{
				labels : Object.keys(this.state.results),
				values : Object.values(this.state.results),
				type : this.props.location.chart
			}];
			 layout = {
				title: 'Pie Chart'
			}
			console.log(data + '' + layout)
		}
	}

	getAdvancedResults = () => {
		axios.get('http://localhost:3001/advancedSearch',{
			params: {
				anyWords: this.props.location.anyWords,
				exactPhrase: this.props.location.exactPhrase,
				exclude: this.props.location.exclude,
				author: this.props.location.author,
				title: this.props.location.title,
				publisher: this.props.location.publisher,
				startYear: this.props.location.startYear,
				endYear: this.props.location.endYear,
				languages: this.props.location.languages,
				regions: this.props.location.regions
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response})}) //results from advancedSearch
	};

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
			<div>
			<div> <h3>Search Output:</h3> </div>
			
			<div id = 'plotlyDiv'>
				{/* Here is where plotly will graph things out */}
			</div>
			</div>
			
		)
    }
}
export default withRouter(Results);
