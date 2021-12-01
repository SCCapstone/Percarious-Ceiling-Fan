import React from 'react';
import Plot from 'react-plotly.js';

class Results extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {data: [], layout: {}, frames: [], config: {}, render: false};
	}

    render(){
		if(this.state) {
		const { results } = this.state
		}
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
export default Results;
