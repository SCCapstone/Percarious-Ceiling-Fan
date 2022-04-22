import React from 'react';
import Plot from 'react-plotly.js';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import axios from "axios"; //for SQL command stuff
import ScaleLoader from "react-spinners/ScaleLoader";
class Results extends React.Component{

	constructor(props){
		super(props);
		window.localStorage.clear();
		this.state = JSON.parse(window.localStorage.getItem('state')) || {data: [], layout: {}, frames: [], config: {}, results: [], chart: "", search: "", field: "", nChart: "", nSearch: "", nField: ""};
	}

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
					console.log(this.props.location.search);
					console.log(this.props.location.field);
					window.localStorage.setItem('state', JSON.stringify(this.state));
					window.localStorage.setItem('chart',  this.state.chart);
					if(this.props.location.chart == 'bar') {
						this.state.chart = 'bar';
						document.getElementById("bar-button").checked = true;
					}
					if(this.props.location.chart == 'line') {
						this.state.chart = 'scatter';
						document.getElementById("line-button").checked = true;
					}
					if(this.props.location.chart == 'pie') {
						this.state.chart = 'pie';
						document.getElementById("pie-button").checked = true;
					}
					this.getBasicResults();
				}
			}
			else {
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
				else {
					console.log(this.props.location.saved.search);
					console.log(this.props.location.saved.field);
					if(this.props.location.saved.chart == 'bar') {
						this.state.chart = 'bar';
						document.getElementById("bar-button").checked = true;
					}
					if(this.props.location.saved.chart == 'line') {
						this.state.chart = 'scatter';
						document.getElementById("line-button").checked = true;
					}
					if(this.props.location.saved.chart == 'pie') {
						this.state.chart = 'pie';
						document.getElementById("pie-button").checked = true;
					}
					window.localStorage.setItem('chart',  this.state.chart);
					this.getSavedBasicResults();
				}
			}
		}
	}
	componentDidUpdate() {
		if( this.state.results != ""){
			document.getElementById("loading").setAttribute("style","display: none;");
		}

	}

	statesPrint() {
		console.log(this.state.nSearch);
		console.log(this.state.nField);
		console.log(this.state.nChart);
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
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from advancedSearch
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
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from basicSearch
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
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from advancedSearch


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
		.then(response => {this.setState({results: response}); window.localStorage.setItem('state', JSON.stringify(this.state)); window.localStorage.setItem('chart', JSON.stringify(response.chart));}) //results from basicSearch
	};


	previousAdvancedSearchView = () => {
		if(this.props.location == undefined )
		{
			return <div></div>
		}
		else
		{
			return(<div>
				<p>{this.props.location.anyWords}</p>
				<p>{this.props.location.exactPhrase}</p>
				<p>{this.props.location.exclude}</p>
				<p>{this.props.location.author}</p>
				<p>{this.props.location.title}</p>
				<p>{this.props.location.publisher}</p>
				<p>{this.props.location.startYear}</p>
				<p>{this.props.location.endYear}</p>
				<p>{this.props.location.languages}</p>
				<p>{this.props.location.regions}</p>
			</div>)
		}
	};

	previousBasicSearchView = () => {
		if(this.props.location == undefined){
			return <div></div>
		}
		else {
			return(
			<div>
				<p>{this.props.location.chart}</p>
				<p>{this.props.location.search.substring(1)}</p>
				<p>{this.props.location.field}</p>
			</div>
			)
		}
	}

	previousSavedAdvancedSearchView = () => {
		if(this.props.location.saved == undefined )
		{
			return <div></div>
		}
		else
		{
			return(<div>
				<p>{this.props.location.saved.anyWords}</p>
				<p>{this.props.location.saved.exactPhrase}</p>
				<p>{this.props.location.saved.exclude}</p>
				<p>{this.props.location.saved.author}</p>
				<p>{this.props.location.saved.title}</p>
				<p>{this.props.location.saved.publisher}</p>
				<p>{this.props.location.saved.startYear}</p>
				<p>{this.props.location.saved.endYear}</p>
				<p>{this.props.location.saved.languages}</p>
				<p>{this.props.location.saved.regions}</p>
			</div>)
		}
	};

	previousSavedBasicSearchView = () => {
		if(this.props.location.saved == undefined){
			return <div></div>
		}
		else {
			return(
			<div>
				<p>{this.props.location.saved.chart}</p>
				<p>{this.props.location.saved.search}</p>
				<p>{this.props.location.saved.field}</p>
			</div>
			)
		}
	}

	chartCheck = (e) =>{
		this.setState({
			nChart: e.target.value
		})
		console.log(this.state.nChart);
	}

	fieldCheck = (e) =>{
		this.setState({
			nField: e.target.value
		})
		console.log(this.state.nField);
	}

    render(){
		let searchBarStyling = {
			backgroundColor:  '#FFFFFF',
			textAlign: 'center',
			fontSize: '120',
			height:'35px',
			width:'50%',
			outlineStyle:'none',
			border: 'none',
			borderRadius: '20px',
			color: 'black',
			marginTop:"5%",
			border: 'solid 2px #6675b0'
		}

		let inputStylingAdvanced = {
			padding: '7px',
			margin: '5px',
			width: '200px',
			height: '30px',
			borderRadius: '20px',
			backgroundColor: '#6675b0',
			marginTop:'10px',
			textDecoration:'none',
			color: 'white',

		}

		let buttonStyling = {
			padding: '10px',
			color:'white',
			margin: '10px',
			backgroundColor: 'darkgrey',
			borderRadius: '10px'
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
			marginBottom: '20px'
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
			<div className='Container' style={{ marginBottom:'100px'}}>
				<div className='SearchBarContainer' style={left}>
					<form>
					<input id='search' style= {searchBarStyling} value ={this.state.nSearch} onChange={e => this.setState({nSearch: e.target.value})} placeholder= "Enter Search here..." required></input>
						<button id="searchbutton" style= {buttonStyling} className = "ui-large-primary-button" onClick={this.statesPrint()}>
						<Link style ={{textDecoration:'none', color: 'white'}} to={{
									pathname: '/reresults',
									search: this.state.nSearch,
									field: this.state.nField,
									chart: this.state.nChart
								}}>
									Search
								</Link>
						</button>
						<div style ={{padding:'10px'}}></div>
					<div className='optionsContainer' style={optionContainer}>
							<div className='previousSearch'>
								<h3 style={{textDecoration:'underline'}}> Current Search:</h3>
								<this.previousBasicSearchView></this.previousBasicSearchView>
								<this.previousAdvancedSearchView></this.previousAdvancedSearchView>
								<this.previousSavedBasicSearchView></this.previousSavedBasicSearchView>
								<this.previousSavedAdvancedSearchView></this.previousSavedAdvancedSearchView>
							</div>
						<div style = {optionStyling}>
							<form>
								<p name="chartPrompt" style={{marginTop: '0px', textDecoration:'underline', fontWeight:"bold"}}>Graph Type:</p>
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<label className='chartPrompt'>Bar:</label>
										<input id="bar-button" type="radio" name = "searchInput"  value="bar" onChange={this.chartCheck} required/> <br/>
										<label className='chartPrompt'>Pie:</label>
										<input type="radio" id="pie-button" name = "searchInput" value="pie" onChange={this.chartCheck}/> <br/>
										<label className='chartPrompt'>Line:</label>
										<input type="radio"  id="line-button"name = "searchInput"  value="line"  onChange={this.chartCheck}/> <br/>
									</div>
							</form>
						</div>
						<div style = {optionStyling }>
								<form>
									<p name="searchPrompt" style={{marginTop: '0px', textDecoration:'underline', fontWeight:"bold"}}>Search for:</p>
										<div onChange={e =>this.state.onChangeValue} style={{ justifyContent: 'center'}}>
											<label className='searchPrompt'>Title:</label>
											<input id="title-button" type="radio" name = "searchInput"  value="title"  onChange={this.fieldCheck} required/> <br/>
											<label className='searchPrompt'>Author:</label>
											<input id="author-button" type="radio" name = "searchInput" value="author"  onChange={this.fieldCheck} /> <br/>
											<label className='searchPrompt'>Year:</label>
											<input id="year-button" type="radio" name = "searchInput"  value="year" onChange={this.fieldCheck} /> <br/>
											<label className='searchPrompt'>Genre:</label>
											<input id="genre-button" type="radio" name = "searchInput" value="genre"  onChange={this.fieldCheck} /> <br/>
											<label className='searchPrompt'>Language:</label>
											<input id="language-button" type="radio" name = "searchInput"  value="language" onChange={this.fieldCheck} /> <br/>
										</div>
								</form>
							</div>
							</div>

							<div style ={{padding:'10px'}}></div>
							<div className='LinksOut'><Link to="/advancedsearch" style ={inputStylingAdvanced}>Advanced Search</Link></div>
							</form>
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
								type: window.localStorage.getItem('chart') || this.state.chart,
								marker: {color: 'blue'}
							}]
						}
					layout={{title: 'Results'}}/>
					<div className='Tips' style={{color:'black', fontWeight:'bold'}}><p>Tip: To save as PNG, hover over the right hand upper corner of the graph</p></div>
				</div>
			</div>
			</>

		)
    }
}
export default withRouter(Results);
