import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component{
	state = {
		connection: "",
		search: "",
		field: "title",
		chart: "bar"
	}

	render() {
		console.log(this.state.search);
		let inputStylingBasic = {
			backgroundColor:  '#FFFFFF',
			textAlign: 'center',
			fontSize: '120',
			height:'50px',
			width:'300px',
			outlineStyle:'none',
			border: 'none',
			borderRadius: '20px',
			color: 'black'
		}

		let inputStylingAdvanced = {
			padding: '10px',
			margin: 'auto',
			width: '350px',
			height: '30px',
			borderRadius: '20px',
			backgroundColor: '#6675b0',
			marginTop:'10px'
		}
		let buttonStyling = {
			padding: '10px',
			outline: '3px solid #6675b0',
			margin: '10px',
			backgroundColor: 'white',
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
		
		return (
			<div>
			<div class="main-body">
						<h1>Welcome to The Precarious Search System</h1>
					</div>
					{/*here is where the dropdowns for picking field and chart type can be added, set them to update like this.setState({field: "whatever user picks here"})*/}
					<div class="option-container" style = {optionContainer}>
						<div style = {optionStyling}>
						<p className="searchPrompt" style={{marginTop: '0px', textDecoration:'underline'}}>Graph Type:</p>
								<div onChange={e =>this.onChangeValue} style={{display: 'flex', justifyContent: 'center'}}>
									<span class='searchPrompt'>Bar:</span>
									<input type="radio" name = "searchInput"  value="bar"/> <br/>
									<span class='searchPrompt'>Pie:</span>
									<input type="radio" name = "searchInput" value="pie"/> <br/>
									<span class='searchPrompt'>Line:</span>
									<input type="radio" name = "searchInput"  value="line"/> <br/>
									
								</div>
					</div>
					{/*Change check marks to radio buttons*/}
					<div style = {optionStyling }>
					<p className="searchPrompt" style={{marginTop: '0px', textDecoration:'underline'}}>Search for:</p>
								<div onChange={e =>this.onChangeValue} style={{display: 'flex', justifyContent: 'center'}}>
									<span class='searchPrompt'>Title:</span>
									<input type="radio" name = "searchInput"  value="bar"/> <br/>
									<span class='searchPrompt'>Author:</span>
									<input type="radio" name = "searchInput" value="pie"/> <br/>
									<span class='searchPrompt'>Year:</span>
									<input type="radio" name = "searchInput"  value="line"/> <br/>
									<span class='searchPrompt'>Genre:</span>
									<input type="radio" name = "searchInput" value="pie"/> <br/>
									<span class='searchPrompt'>Language:</span>
									<input type="radio" name = "searchInput"  value="line"/> <br/>
								</div>
					</div>
					</div>
					<div class="ui-input">
						<input id="search" style = {inputStylingBasic} value={this.state.search} onChange={e => this.setState({search: e.target.value})} placeholder="Enter your Search Here"/> 
							<button id="searchbutton" style= {buttonStyling} class = "ui-large-primary-button">
								<Link style ={{textDecoration:'none', color: 'black'}} to={{
									pathname: '/results',
									search: this.state.search,
									field: this.state.field,
									chart: this.state.chart
								}}>
									Search
								</Link>
							</button>
					</div>
					<div><h2>OR</h2></div>
					<div class = "advanced-link" style = {inputStylingAdvanced}>
					<Link to="/advancedsearch" style ={{textDecoration:'none', color: 'white'}}>Advanced Search</Link>
					</div>
			</div>
		)
	}
};

export default HomePage
