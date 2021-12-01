const express = require('express')
const app = express()
const cors = require("cors");
const connection = require('./db');
const bodyParser = require('body-parser');
//const mysql = require('mysql2/promise');
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('server and client are connected')
})


//Function takes in sql response, returns dictionary of decade:count
function getDecades(data){
	decades = {};
	for(let i = 0; i < data.length; i++){
		year = data[i].control_string.substring(7,11);
		dec = Math.trunc(year/10)*10;
		if(!decades[dec]) decades[dec] = 0;
		decades[dec]++;
	}
	return decades;
}

//Function takes in sql response, returns dictionary of language:count
function getLangs(data){
	langs = {};
	for(let i = 0; i < data.length; i++){
		lang = data[i].control_string.substring(35,38);
		if(!langs[lang]) langs[lang] = 0;
		langs[lang]++;
	}
	return langs;
}

//Function takes in sql response, returns dictionary of country code:count. This uses the 008 tag to determine location, much more normalized than the publisher location field in 260
function get008Loc(data){
	locs = {};
	for(let i = 0; i < data.length; i++){
		loc = data[i].control_string.substring(15,18).trim();
		if(!locs[loc]) locs[loc] = 0;
		locs[loc]++;
	}
	return locs;
}

//Function takes in sql response, returns dictionary of country code:count. Not normalized, but can be much more specific than 008.
function get260Loc(data){
	locs = {};
	for(let i = 0; i < data.length; i++){
		loc = data[i].publoc
		if(!locs[loc]) locs[loc] = 0;
		locs[loc]++;
	}
	return locs;
}

//Builds an sql query for multiple substrings
function substringSearch(field, words){
	let first = true;
	let out = `SELECT * FROM bookdata WHERE `;
	for(let i in words){
		if(!first) out+= "OR "
		out += `${field} LIKE "%${words[i]}%" `;
		first = false
	}
	return out+";";
}

function excludeSearch(field, words){
	let out = `SELECT * FROM bookdata WHERE title NOT IN (`;
	for(let i in words){
		if(i != words.length-1)
		out += `'${words[i]}', `;
		else
		out += `'${words[i]}'`;
	}
	return out+");";
}

//basic search query
app.get("/basicSearch", async(req, res) => {
	var strings = (`${req.query.search}`).split(",");
	const GET_QUERY = substringSearch('title',strings);
	console.log(GET_QUERY);
		
			connection.query(GET_QUERY, (err, response)=>{
			if(err) console.log(err)
			else{
			console.log("yo it about to send the stuff to react")
			//response = getDecades(response);
			console.log("got past getDecades");
			console.log(response);
			res.send(response);
			
			console.log('sent');
			}
		})
	
  })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
