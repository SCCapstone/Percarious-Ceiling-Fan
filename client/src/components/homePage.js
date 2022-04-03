import React from 'react';
import { Link } from 'react-router-dom';
import ProtectedBasicRoute from './ProtectedBasicRoute';

class HomePage extends React.Component{
	state = {
		connection: "",
		search: "",
		field: "title",
		chart: "bar",
		name: ""
	} 

	chartCheck = (e) =>{
		this.setState({
			chart: e.target.value
		})
	}

	fieldCheck = (e) =>{
		this.setState({
			field: e.target.value
		})
	}
	

	render() {
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

		return (
			<div>
			<div className="main-body">
						<h1>Welcome to The Precarious Search System</h1>
					</div>
					<div className="option-container" style = {optionContainer}>
						<div style = {optionStyling}>
						<form>
						<p name="chartPrompt" style={{marginTop: '0px', textDecoration:'underline'}}>Graph Type:</p>
								<div style={{display: 'flex', justifyContent: 'center'}}>
									<label className='chartPrompt'>Bar:</label>
									<input type="radio" name = "searchInput"  value="bar" defaultChecked={this.chartCheck} onChange={this.chartCheck}/> <br/>
									<label className='chartPrompt'>Pie:</label>
									<input type="radio" name = "searchInput" value="pie" onChange={this.chartCheck}/> <br/>
									<label className='chartPrompt'>Line:</label>
									<input type="radio" name = "searchInput"  value="line" onChange={this.chartCheck}/> <br/>
								</div>
							</form>
					</div>
					<div style = {optionStyling }>
					<form>
					<p name="searchPrompt" style={{marginTop: '0px', textDecoration:'underline'}}>Search for:</p>
								<div onChange={e =>this.state.onChangeValue} style={{display: 'flex', justifyContent: 'center'}}>
									<label className='searchPrompt'>Title:</label>
									<input type="radio" name = "searchInput"  value="title" onChange={this.fieldCheck} /> <br/>
									<label className='searchPrompt'>Author:</label>
									<input type="radio" name = "searchInput" value="author" onChange={this.fieldCheck} /> <br/>
									<label className='searchPrompt'>Year:</label>
									<input type="radio" name = "searchInput"  value="year" onChange={this.fieldCheck} /> <br/>
									<label className='searchPrompt'>Genre:</label>
									<input type="radio" name = "searchInput" value="genre"onChange={this.fieldCheck} /> <br/>
									<label className='searchPrompt'>Language:</label>
									<input type="radio" name = "searchInput"  value="language"onChange={this.fieldCheck} /> <br/>
								</div>
								</form>
					</div>
					
					</div>
					<div className="ui-input">
						<input id="search" style = {inputStylingBasic} value={this.state.search} onChange={e => this.setState({search: e.target.value})} placeholder="Enter your Search Here"/> 
							<button id="searchbutton" style= {buttonStyling} className = "ui-large-primary-button">
								<Link style ={{textDecoration:'none', color: 'white'}} to={{
									pathname: '/results',
									search: this.state.search,
									field: this.state.field,
									chart: this.state.chart
								}}>
									Search
								</Link>
							</button>
							<ProtectedBasicRoute search={this.state.search} field={this.state.field} chart={this.state.chart}></ProtectedBasicRoute> 
					</div>
					<div><h2>OR</h2></div>
					<div className = "advanced-link" style = {inputStylingAdvanced}>
					<Link to="/advancedsearch" style ={{textDecoration:'none', color: 'white'}}>Advanced Search</Link>
					</div>
			</div>
		)
	}
};

export default HomePage
