import React from 'react';
import axios from "axios"; //for SQL command stuff

// //Function takes in sql response, returns dictionary of decade:count
// function getDecades(data){
// 	decades = {};
// 	for(let i = 0; i < data.length; i++){
// 		year = data[i].control_string.substring(7,11);
// 		dec = Math.trunc(year/10)*10;
// 		if(!decades[dec]) decades[dec] = 0;
// 		decades[dec]++;
// 	}
// 	return decades;
// }

// //Function takes in sql response, returns dictionary of language:count
// function getLangs(data){
// 	langs = {};
// 	for(let i = 0; i < data.length; i++){
// 		lang = data[i].control_string.substring(35,38);
// 		if(!langs[lang]) langs[lang] = 0;
// 		langs[lang]++;
// 	}
// 	return langs;
// }

// //Function takes in sql response, returns dictionary of country code:count. This uses the 008 tag to determine location, much more normalized than the publisher location field in 260
// function get008Loc(data){
// 	locs = {};
// 	for(let i = 0; i < data.length; i++){
// 		loc = data[i].control_string.substring(15,18).trim();
// 		if(!locs[loc]) locs[loc] = 0;
// 		locs[loc]++;
// 	}
// 	return locs;
// }

// //Function takes in sql response, returns dictionary of country code:count. Not normalized, but can be much more specific than 008.
// function get260Loc(data){
// 	locs = {};
// 	for(let i = 0; i < data.length; i++){
// 		loc = data[i].publoc
// 		if(!locs[loc]) locs[loc] = 0;
// 		locs[loc]++;
// 	}
// 	return locs;
// }


class Results extends React.Component{
    state = {
        connection: ""
    }

    componentDidMount() {
		console.log('this runs');
		this.getConnectionTest();
	}

    getConnectionTest = () => {
		axios.get('http://localhost:3001/')
		.then((response) => response.data)
		.then(response => {this.setState({connection: response})})
	};

    render(){
        return (
			<h>put stuff here</h>
		)
    }
}
export default Results;
