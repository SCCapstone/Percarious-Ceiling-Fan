import React from 'react';
import Plot from 'react-plotly.js';
import { withRouter } from "react-router";
import axios from "axios"; //for SQL command stuff
import ScaleLoader from "react-spinners/ScaleLoader";
class Results extends React.Component{

	constructor(props){
		super(props);
		this.state = JSON.parse(window.localStorage.getItem('state')) || {data: [], layout: {}, frames: [], config: {}, results: [], chart: ""};
	}

	componentDidMount = () => {

		document.getElementById("loading").setAttribute("style","display: block;")
		console.log(this.state.results)
		if(this.props.location !== undefined) {
			if(!this.props.location.saved){
				console.log(this.props.location.chart);
				this.setState({chart: this.props.location.chart})
				window.localStorage.setItem('state', JSON.stringify(this.state));
				console.log(JSON.parse(window.localStorage.getItem('state')));
				console.log(JSON.parse(window.localStorage.getItem('state')).chart);
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
					if(this.props.location.chart == 'bar') this.state.chart = 'bar';
					if(this.props.location.chart == 'line') this.state.chart = 'scatter';
					if(this.props.location.chart == 'pie') this.state.chart = 'pie';
					this.getBasicResults();

				}
			}
			else {
				console.log(this.props.location.saved.chart);
				this.setState({chart: this.props.location.saved.chart})
				window.localStorage.setItem('state', JSON.stringify(this.state));
				if(!this.props.location.saved.search){
					console.log(this.props.location.saved.anyWords);
					console.log(this.props.location.saved.exactPhrase);
					console.log(this.props.location.saved.exclude);
					console.log("Author: "+this.props.location.saved.author+" Title: "+this.props.location.saved.title+" Publisher: "+this.props.location.saved.publisher);
					console.log(this.props.location.saved.startYear+" to "+this.props.location.saved.endYear);
					console.log(this.props.location.saved.languages);
					console.log(this.props.location.saved.regions);
					this.getSavedAdvancedResults();
				}
				else {
					console.log(this.props.location.saved.search);
					console.log(this.props.location.saved.field);
					if(this.props.location.saved.chart == 'bar') this.state.chart = 'bar';
					if(this.props.location.saved.chart == 'line') this.state.chart = 'scatter';
					if(this.props.location.saved.chart == 'pie') this.state.chart = 'pie';
					this.getSavedBasicResults();
				}
			}
		}
		setTimeout(() => {
			document.getElementById("loading").setAttribute("style", "display: none;")
		}, 60000);
	}
	componentDidUpdate() {
		if( this.state.results != ""){
			document.getElementById("loading").setAttribute("style","display: none;");
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
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state));}) //results from advancedSearch

	};

	getBasicResults = () => {
		axios.get('http://localhost:3001/basicSearch',{
			params: {
				search: this.props.location.search.substring(1),
				field: this.props.location.field,
				chart: this.props.location.chart
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state));}) //results from basicSearch
	};

	getSavedAdvancedResults = () => {
		axios.get('http://localhost:3001/advancedSearch',{
			params: {
				anyWords: this.props.location.saved.anyWords,
				exactPhrase: this.props.location.saved.exactPhrase,
				exclude: this.props.location.saved.exclude,
				author: this.props.location.saved.author,
				title: this.props.location.saved.title,
				publisher: this.props.location.saved.publisher,
				startYear: this.props.location.saved.startYear,
				endYear: this.props.location.saved.endYear,
				languages: this.props.location.saved.languages,
				regions: this.props.location.saved.regions
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state));}) //results from advancedSearch
	};

	getSavedBasicResults = () => {
		axios.get('http://localhost:3001/basicSearch',{
			params: {
				search: this.props.location.saved.search,
				field: this.props.location.saved.field,
				chart: this.props.location.saved.chart
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state));}) //results from basicSearch
	};

    render(){
        return (
			<>

			<div> <h3>Search Output:</h3> </div>
			<div id="loading" display="true"><ScaleLoader /> </div>
 			<Plot
			data={
					[{
						labels: Object.keys(this.state.results).map(function(item) {
							return String(item);
						}),
						values: Object.values(this.state.results),
						x: Object.keys(this.state.results),
						y: Object.values(this.state.results),
						type: JSON.parse(window.localStorage.getItem('state')).chart || this.state.chart,
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
