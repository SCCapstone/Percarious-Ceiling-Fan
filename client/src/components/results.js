import React from 'react';
import Plot from 'react-plotly.js';
import { withRouter } from "react-router";

class Results extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {data: [], layout: {}, frames: [], config: {}};
	}

	componentDidMount = () => {
		console.log('reached');
		if(this.props.location !== undefined) {
			console.log('reached, not undefined');
			console.log(this.props.location.state);
			}
	}

    render(){

        return (
			<Plot 
			data={this.state.date}
			layout={this.state.layout}
			frames={this.state.frames}
			config={this.state.config}
			onInitialized={(figure) => this.setState(figure)}
			onUpdate={(figure)=> this.setState(figure)}
			/>
		)
    }
}
export default withRouter(Results);
