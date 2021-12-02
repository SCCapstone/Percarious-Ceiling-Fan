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
			console.log(this.state.results);
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
			<>
			<div>
			<hr />
				{this.state.results.map((result) => (
				<div className="card">
				<div className="meta">{result.title}</div>
				<p></p>
					<hr />
				</div>
				))}
			</div>

			<Plot 
			data={
					[{
						x: Object.keys(this.state.results),
						y: Object.values(this.state.results),
						type: 'bar',
						marker: {color: 'blue'}
					}]
				}
			layout={{title: 'results'}}
			//frames={this.state.frames}
			//config={this.state.config}
			//onInitialized={(figure) => this.setState(figure)}
			//onUpdate={(figure)=> this.setState(figure)}
			//used for future development 
			/>
			</>
		)
    }
}
export default withRouter(Results);
