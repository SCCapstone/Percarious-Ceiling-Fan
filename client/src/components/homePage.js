import React from 'react';
import { Link } from 'react-router-dom';
import ProtectedBasicRoute from './ProtectedBasicRoute';

class HomePage extends React.Component{
	
	/*State management and required variables to perform search */
	state = {
		connection: "",
		search: "",
		field: "",
		chart: "",
		name: ""
	} 

	/*
	 	Sets the graph type state value when clicked 
	*/
	chartCheck = (e) =>{
		this.setState({
			chart: e.target.value
		})
	}

	/*
		Sets the field state value the user would like to search by when clicked
	*/
	fieldCheck = (e) =>{
		this.setState({
			field: e.target.value
		})
	}
	

	render() {
		/*
			Styling presets to use in the render of the website
		*/
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

		let optionStyling = {
			padding:'10px'
		}

		let optionContainer = {
			padding: '5px',
			backgroundColor: 'white',
			margin:'auto',
			width: "55%",
			textAlign: 'center',
			borderRadius: '10px',
			outline: '2px dotted #6675b0',
			fontWeight: 'bolder',
			marginBottom: '20px'
		}

		/* 
			The body of the website rendering
			Protected route brings in search and save buttons
			Link allows user to enter advanced search
		*/
		return (
			<div>
				<div className="main-body">
					<h1>Welcome to The Precarious Search System</h1>
					<div className="option-container" style = {optionContainer}>
						<div style = {optionStyling}>
							<div>
								<p name="chartPrompt" style={{marginTop: '0px'}}><span style={{color:'red'}}> *</span> <span style={{textDecoration:'underline'}}>Graph Type:</span></p>
								<div style={{display: 'flex', justifyContent: 'center'}}>
									<label className='chartPrompt'>Bar:</label>
									<input type="radio" name = "searchInput"  value="bar" defaultChecked={this.chartCheck} onChange={this.chartCheck} required="required"/> <br/>
									<label className='chartPrompt'>Pie:</label>
									<input type="radio" name = "searchInput" value="pie" onChange={this.chartCheck}/> <br/>
									<label className='chartPrompt'>Line:</label>
									<input type="radio" name = "searchInput"  value="line" onChange={this.chartCheck}/> <br/>
								</div>
							</div>
						</div>
						<div style = {optionStyling }>
							<form>
								<p name="searchPrompt" style={{marginTop: '0px'}}> <span style={{color:'red'}}> *</span> <span style={{textDecoration:'underline'}}>Search for:</span></p>
								<div onChange={e =>this.state.onChangeValue} style={{ justifyContent: 'center'}}>
									<label className='searchPrompt'>Title:</label>
									<input type="radio" name = "searchInput"  value="title" onChange={this.fieldCheck} /> <br/>
									<label className='searchPrompt'>Author:</label>
									<input type="radio" name = "searchInput" value="author" onChange={this.fieldCheck} /> <br/>
								</div>
							</form>
						</div>
					</div>
					<div className="ui-input" >
						<div style ={{paddingBottom: '10px', display:"-webkit-inline-flex"}}>
						<p style={{paddingRight:'5px', color: 'red'}}>*</p>
						<input id="search" style = {inputStylingBasic} value={this.state.search} onChange={e => this.setState({search: e.target.value})} placeholder="Enter your Search Here" required/> 
						</div>
						<ProtectedBasicRoute search={this.state.search} field={this.state.field} chart={this.state.chart}></ProtectedBasicRoute> 
						<p style={{color: 'red'}}>* indicates a required field</p>
					</div>
					<div><h2>OR</h2></div>
					<div className = "advanced-link" style = {inputStylingAdvanced}>
					<Link to="/advancedsearch" style ={{textDecoration:'none', color: 'white'}}>Advanced Search</Link>
					</div>
			</div>
		</div>
		)
	}
};

export default HomePage
