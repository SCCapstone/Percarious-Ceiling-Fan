import React from 'react';
import Plot from 'react-plotly.js';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import axios from "axios"; //for SQL command stuff
import ScaleLoader from "react-spinners/ScaleLoader";
import ProtectedReResultsRoute from './ProtectedReResultsRoute';
class ReResults extends React.Component{
	//sets up the variables needed for graphical display, like results and the new versions to run the next search
	constructor(props){
		super(props);
		window.localStorage.clear();
		this.state = JSON.parse(window.localStorage.getItem('state')) || {data: [], layout: {}, frames: [], config: {}, results: [], chart: "", search: "", field: "", nChart: "", nSearch: "", nField: ""};
	}

	/*
	 Ran as the file is loaded onto the screen to make sure that the variables from other pages have mounted to this page for display
	*/
	componentDidMount = () => {
		document.getElementById("loading").setAttribute("style","display: block;")
		console.log(this.state.results)
		if(this.props.location !== undefined) {
			if(!this.props.location.saved){
				console.log(this.props.location.chart);
				this.setState({chart: this.props.location.chart})
				window.localStorage.setItem('state', JSON.stringify(this.state));
				window.localStorage.setItem('chart',  this.props.location.chart);
				console.log(JSON.parse(window.localStorage.getItem('state')));
				console.log(window.localStorage.getItem('chart'));
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
					//This also sets the exact type of graph type for plotly
					console.log(this.props.location.search);
					console.log(this.props.location.field);
					window.localStorage.setItem('state', JSON.stringify(this.state));
					window.localStorage.setItem('chart',  this.state.chart);
					if(this.props.location.chart == 'bar') {
						this.state.chart = 'bar';
						
					}
					if(this.props.location.chart == 'line') {
						this.state.chart = 'scatter';
						
					}
					if(this.props.location.chart == 'pie') {
						this.state.chart = 'pie';
						
					}
					this.getBasicResults();
				}
			}
			else { //console logs if saved searches have been loaded in for testing
				console.log(this.props.location.saved.chart);
				this.setState({chart: this.props.location.saved.chart})
				window.localStorage.setItem('chart',  this.props.location.saved.chart);
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
				else {//sets bar type
					console.log(this.props.location.saved.search);
					console.log(this.props.location.saved.field);
					if(this.props.location.saved.chart == 'bar') {
						this.state.chart = 'bar';
					}
					if(this.props.location.saved.chart == 'line') {
						this.state.chart = 'scatter';
					}
					if(this.props.location.saved.chart == 'pie') {
						this.state.chart = 'pie';	
					}
					window.localStorage.setItem('chart',  this.state.chart);
					this.getSavedBasicResults();
				}
			}
		}
	}

	//Runs constantly to check if results has populated the graph, if so; it'll remove the loading bar
	componentDidUpdate() {
		if( this.state.results != ""){
			document.getElementById("loading").setAttribute("style","display: none;");
		}

	}

	//Receives the advanced search parameters from the advanced search
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
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from advancedSearch
	};

	//receives the basic search parameters
	getBasicResults = () => {
		axios.get('http://localhost:3001/basicSearch',{
			params: {
				search: this.props.location.search.substring(1),
				field: this.props.location.field,
				chart: this.props.location.chart
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from basicSearch
	};


	//Receives previously saved advanced search parameters
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
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from advancedSearch


	};

	//Receives previously saved basic search parameters
	getSavedBasicResults = () => {
		axios.get('http://localhost:3001/basicSearch',{
			params: {
				search: this.props.location.saved.search,
				field: this.props.location.saved.field,
				chart: this.props.location.saved.chart
			 }
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from basicSearch
	};


	//Sets the view for previous search reults when populated, changes based on if the variable is filled
	previousSearchView = () => {
		if(this.props.location == undefined && this.props.location.saved == undefined)
		{
			return <div></div>
		}
		else if (this.props.location.saved == undefined)
		{ //checks for if the variable of a search is filled for display
			if(!this.props.location.search){
				let anyS = ""; let exactS = ""; let exclS = ""; let tagsS = "Querying: ";
				let yearS = ""; let langS = ""; let regS = "";
				if(this.props.location.anyWords != "") { anyS = "Any: " }
				if(this.props.location.exactPhrase != "") { exactS = "Exact: " }
				if(this.props.location.exclude != "") { exclS = "Exclude: " }
				if(this.props.location.author != "") { tagsS = tagsS+"Author " }
				if(this.props.location.title != "") { tagsS = tagsS+"Title " }
				if(this.props.location.publisher != "") { tagsS = tagsS+"Publisher " }
				if(this.props.location.startYear != "") { yearS = "From: "+this.props.location.startYear+" to: "+this.props.location.endYear }
				if(this.props.location.languages != "") { langS = "Language(s): " }
				if(this.props.location.regions != "") { regS = "Region(s): " }
				return(<div>
					<p>Chart: {this.props.location.chart}</p>
					<p>{anyS}{this.props.location.anyWords}</p>
					<p>{exactS}{this.props.location.exactPhrase}</p>
					<p>{exclS}{this.props.location.exclude}</p>
					<p>{tagsS}</p>
					<p>{yearS}</p>
					<p>{langS}{this.props.location.languages}</p>
					<p>{regS}{this.props.location.regions}</p>
				</div>)
			}
			else {//checks if searching by publisher
				if(this.props.location.field == "pubname"){
					return(
						<div>
							<p>Chart: {this.props.location.chart}</p>
							<p>Field: publisher</p>
							<p>Search: {this.props.location.search.substring(1)}</p>
						</div>
						)
				}
				else{
					return( //returns base basic search 
						<div>
							<p>Chart: {this.props.location.chart}</p>
							<p>Field: {this.props.location.field}</p>
							<p>Search: {this.props.location.search.substring(1)}</p>
						</div>
						)
				 }
			}
		}
		else
		{
			if(!this.props.location.saved.search){ //checks for if the variable of a saved search is filled for display
				let anyS = ""; let exactS = ""; let exclS = ""; let tagsS = "Querying: ";
				let yearS = ""; let langS = ""; let regS = "";
				if(this.props.location.saved.anyWords != "") { anyS = "Any: " }
				if(this.props.location.saved.exactPhrase != "") { exactS = "Exact: " }
				if(this.props.location.saved.exclude != "") { exclS = "Exclude: " }
				if(this.props.location.saved.author != "") { tagsS = tagsS+"Author " }
				if(this.props.location.saved.title != "") { tagsS = tagsS+"Title " }
				if(this.props.location.saved.publisher != "") { tagsS = tagsS+"Publisher " }
				if(this.props.location.saved.startYear != "") { yearS = "From: "+this.props.location.saved.startYear+" to: "+this.props.location.saved.endYear }
				if(this.props.location.saved.languages != "") { langS = "Language(s): " }
				if(this.props.location.saved.regions != "") { regS = "Region(s): " }
				return(<div>
					<p>Chart: {this.props.location.saved.chart}</p>
					<p>{anyS}{this.props.location.saved.anyWords}</p>
					<p>{exactS}{this.props.location.saved.exactPhrase}</p>
					<p>{exclS}{this.props.location.saved.exclude}</p>
					<p>{tagsS}</p>
					<p>{yearS}</p>
					<p>{langS}{this.props.location.saved.languages}</p>
					<p>{regS}{this.props.location.saved.regions}</p>
				</div>)
			}
			else { //checks if searching by publisher
				if(this.props.location.saved.field == "pubname"){
					return(
						<div>
							<p>Chart: {this.props.location.saved.chart}</p>
							<p>Field: publisher</p>
							<p>Search: {this.props.location.saved.search}</p>
						</div>
						)
				}
				else{
					return( //returns base basic search
						<div>
							<p>Chart: {this.props.location.saved.chart}</p>
							<p>Field: {this.props.location.saved.field}</p>
							<p>Search: {this.props.location.saved.search}</p>
						</div>
						)
				 }
			}
		}
	};

	//sets the chart variable when clicked for future graphing
	chartCheck = (e) =>{
		this.setState({
			nChart: e.target.value
		})
		console.log(this.state.nChart);
	}

	// Sets the field to search for when clicked
	fieldCheck = (e) =>{
		this.setState({
			nField: e.target.value
		})
		console.log(this.state.nField);
	}

	//Handles rendering all results page html and plotly graphical input
    render(){
		//various preset styling guidelines
		let searchBarStyling = {
			backgroundColor:  '#FFFFFF',
			textAlign: 'center',
			fontSize: '120',
			height:'35px',
			width:'50%',
			outlineStyle:'none',
			borderRadius: '20px',
			color: 'black',
			marginTop:"2%",
			marginBottom: "2%",
			border: 'solid 2px #6675b0'
		}

		let inputStylingAdvanced = {
			padding: '5px',
			borderRadius: '20px',
			backgroundColor: '#6675b0',
			marginTop:'10px',
			textDecoration:'none',
			color: 'white',

		}
		
		let optionStyling = {
			padding:'10px'
		}

		let optionContainer = {
			padding: '5px',
			backgroundColor: 'white',
			margin:'auto',
			width: '40%',
			textAlign: 'center',
			borderRadius: '10px',
			outline: '2px dotted #6675b0',
			fontWeight: 'bolder',
			marginBottom: '5px'
		}

		let left = {
			width: '50%',
			float: 'left'
		}
		let right = {
			width: '50%',
			float: 'right'
		}

        return (
			<>
			<div className='Container' style={{ marginBottom:'100px', overflow: "hidden"}}>
				<div className='SearchBarContainer' style={left}>
							<div style ={{padding:'10px'}}></div>
							<div className='previousSearch' style={optionContainer}>
								<h3 style={{textDecoration:'underline'}}> Current Search:</h3>
								<this.previousSearchView></this.previousSearchView>
							</div>
					<div className='optionsContainer' style={optionContainer}>
						<h3 style={{textDecoration: 'underline'}}>New Search:</h3>
						<div style = {optionStyling}>
							<form>
								<p name="chartPrompt" style={{marginTop: '0px', textDecoration:'underline'}}>Graph Type:</p>
									<div style={{justifyContent: 'center'}}>
										<label className='chartPrompt'>Bar:</label>
										<input id="bar-button" type="radio" name = "searchInput"  value="bar" onChange={this.chartCheck} required/> <br/>
										<label className='chartPrompt'>Pie:</label>
										<input type="radio" id="pie-button" name = "searchInput" value="pie" onChange={this.chartCheck}/> <br/>
										<label className='chartPrompt'>Line:</label>
										<input type="radio"  id="line-button"name = "searchInput"  value="line"  onChange={this.chartCheck}/> <br/>
									</div>
							</form>
						</div>
						<div style={{height:'10px'}}></div>
						<div style = {optionStyling }>
								<form>
									<p name="searchPrompt" style={{marginTop: '0px', textDecoration:'underline'}}>Search for:</p>
										<div onChange={e =>this.state.onChangeValue} style={{ justifyContent: 'center'}}>
											<label className='searchPrompt'>Title:</label>
											<input id="title-button" type="radio" name = "searchInput"  value="title"  onChange={this.fieldCheck} required/> <br/>
											<label className='searchPrompt'>Author:</label>
											<input id="author-button" type="radio" name = "searchInput" value="author"  onChange={this.fieldCheck} /> <br/>
											<label className='searchPrompt'>Publisher:</label>
											<input id="publisher-button" type="radio" name = "searchInput" value="pubname" onChange={this.fieldCheck} /> <br/>
										</div>
								</form>
							</div>
							</div>
							<input id='search' style= {searchBarStyling} value ={this.state.nSearch} onChange={e => this.setState({nSearch: e.target.value})} placeholder= "Enter Search here..." required></input>
							<ProtectedReResultsRoute search={this.state.nSearch} field={this.state.nField} chart={this.state.nChart}></ProtectedReResultsRoute> 
							<div className='LinksOut'><Link to="/advancedsearch" style ={inputStylingAdvanced}>Advanced Search</Link></div>
				</div>
				<div style ={{padding:'10px'}}></div>
				<div className='GraphConatiner' style={right}>
				<div style={{borderBottom:'solid 1px #6675b0', width: '30%', margin: 'auto'}}> <h3 style={{color: '#6675b0'}}>Search Output:</h3> </div>
					<div style ={{padding:'10px'}}></div>
					<div id="loading" display="true"><ScaleLoader/> </div>
					<Plot
						data={
							[{
								labels: Object.keys(this.state.results).map(function(item) {
									return String(item);
								}),
								values: Object.values(this.state.results),
								x: Object.keys(this.state.results),
								y: Object.values(this.state.results),
								type: this.state.chart,
								marker: {color: 'blue'}
							}]
						}
					layout={{title: 'Results',
					 	xaxis: {
                 		title: 'Year'
                 		},
                 		yaxis: {
                 		 title: 'Books'
                 		 }
                 		 }}/>
					<div className='Tips' style={{color:'black', fontWeight:'bold'}}><p>Tip: To save as PNG, hover over the right hand upper corner of the graph</p></div>
				</div>
			</div>
			</>

		)
    }
}
export default withRouter(ReResults);
