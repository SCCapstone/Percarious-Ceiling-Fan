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

//Functions for advanced search sql string building
function fander(ander, out){
	if(ander){
		ander = false;
		out+= ") AND (";
	}
	return ander,out;
}

//Function to build sql quries
function build(anyWords, exactPhrase, exclude, author, title, publisher, startYear, endYear, languages, regions){
	fields = [];
	if(title == "true") fields[fields.length] = "title";
	if(author == "true") fields[fields.length] = "author";
	if(publisher == "true") fields[fields.length] = "pubname";
	//initialize query
	out = "SELECT * from bookdata WHERE ((";
	//iterate over anywords
	for(f = 0; f < fields.length; f++){
		field = fields[f];
		any = anyWords.split(",");
		if(anyWords.length == 0) any = [];
		ander = false;
		for(word = 0; word < any.length; word++){
			ander = true;
			out+= `${field} like \"%` +any[word] + "%\""
			if(word != any.length-1)
				out+= ") OR ("
		}
			//iterate over exactwords
		if(exactPhrase.length > 0){
			exac = exactPhrase.split(",");
			ander,out = fander(ander,out);
			for(word = 0; word < exac.length; word++){
				ander = true;
				out+= `${field}  like \"%` +exac[word] + "%\""
				if(word != exac.length-1)
					out+= ") AND ("
			}
		}
			//iterate over excluded words
		if(exclude.length > 0){
			exc = exclude.split(",");
			ander,out = fander(ander,out);
			if(exclude.length == 0) exc = [];
			for(word = 0; word < exc.length; word++){
				ander = true;
				out+= `${field} NOT LIKE "%${exc[word]}%"`
				if(word != exc.length-1)
					out+= ") AND ("
			}
		}
		out+=")"
		if(f != fields.length-1) out+= ") OR ((";
	}
	out+=")"
		//Add restrictions
	sy = 0
	if(startYear.length > 1) sy=parseInt(startYear);
	ey = 0
	if(endYear.length > 1) ey=parseInt(endYear);
	if(sy != 0 && !isNaN(sy)){
		out+= ` AND SUBSTR(control_string,8,4) > ${sy}`
	}
	if(ey != 0 && !isNaN(ey)){
		out+= ` AND SUBSTR(control_string,8,4) < ${ey}`
	}
	lang = []
	if(languages.length > 1){
		out += " AND SUBSTR(control_string,36,3) IN (";
		lang = languages.split(",")
		for(let i = 0; i < lang.length; i++){
			out+= `"${lang[i]}"`;
			if(i != lang.length-1) out+=",";
		}
		out+=")";
	}
	if(regions.length > 1){
		out += " AND SUBSTR(control_string,16,3) IN (";
		reg = regions.split(",")
		for(let i = 0; i < reg.length; i++){
			out+= `"${reg[i]}"`;
			if(i != reg.length-1) out+=",";
		}
		out+=")";
	}
	out+=";"
	return out;

}

//Function takes in sql response, returns dictionary of decade:count
function getDecades(data, chart){
	decades = {};
	for(let i = 0; i < data.length; i++){
		year = data[i].control_string.substring(7,11);
		dec = Math.trunc(year/10)*10;
		if(!decades[dec]) decades[dec] = 0;
		decades[dec]++;
	}
	if(chart == "pie"){
		let sum = Object.values(decades).reduce((partialSum, a) => partialSum + a, 0);
		for (const [key, value] of Object.entries(decades)) {
		console.log(sum + " " + value + " " + value/sum);
		decades[key] = value/sum;
	  	console.log(key, value);
		}
		for(let i = 0; i < decades.length; i++){

			decades[i] = decades[i]/sum;
		}
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
	let out = `SELECT * FROM bookdata WHERE ${field} NOT IN (`;
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
	var field = (`${req.query.field}`);
	const GET_QUERY = substringSearch(field,strings);
	console.log(GET_QUERY);

			connection.query(GET_QUERY, (err, response)=>{
			if(err) console.log(err)
			else{
			if(response.length > 0)
			response = getDecades(response, req.query.chart);
			console.log(response);
			res.send(response);

			console.log('sent');
			}
		})
  })

//advanced search query
app.get("/advancedSearch", async(req, res) => {
	//Exttract vars from response
	var anyWords = (`${req.query.anyWords}`);
	var exactPhrase = (`${req.query.exactPhrase}`);
	var exclude = (`${req.query.exclude}`);
	var author = (`${req.query.author}`);
	var title = (`${req.query.title}`);
	var publisher = (`${req.query.publisher}`);
	var startYear = (`${req.query.startYear}`);
	var endYear = (`${req.query.endYear}`);
	var languages = (`${req.query.languages}`);
	var regions = (`${req.query.regions}`);
	console.log(anyWords, exactPhrase, exclude, author, title, publisher, startYear, endYear, languages, regions)
	//Build sql string
	const GET_QUERY = build(anyWords, exactPhrase, exclude, author, title, publisher, startYear, endYear, languages, regions);
	console.log(GET_QUERY);

			connection.query(GET_QUERY, (err, response)=>{
			if(err) console.log(err)
			else{
			if(response.length > 0)
			response = getDecades(response);
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
