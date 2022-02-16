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
			backgroundColor:  '#6675b0',
			textAlign: 'center',
			fontSize: '120',
			height:'50px',
			width:'300px',
			outline: 'none',
			borderRadius: '20px',
			color: '#FFFFFF',
			outlineStyle:'none',
			border: 'none'
		}
		let buttonStyling = {
			padding: '1px',
			outline: 'none',
			margin: '10px'
		}
		return (
			<div>
			<div class="main-body">
						<h1>Welcome to The Precarious Search System</h1>
					</div>
					<ReactComment text = {'here is where the dropdowns for picking field and chart type can be added, set them to update like this.setState({field: "whatever user picks here"})'}/>
					<div class="ui-input">
						<input id="search" style = {inputStylingBasic} value={this.state.search} onChange={e => this.setState({ search: e.target.value})} placeholder="Enter your Search Here"/> 
							<button id="searchbutton" style= {buttonStyling} class = "ui-large-primary-button">
								<Link to={{
									pathname: '/results',
									search: this.state.search,
									field: this.state.field,
									chart: this.state.chart
								}}>
									Search
								</Link>
							</button>
					</div>
					<Link to="/advancedsearch">Advanced Search</Link>
			</div>
		)
	}
};

export default HomePage
