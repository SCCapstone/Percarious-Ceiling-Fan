const express = require('express')
const app = express()
const cors = require("cors");
const connection = require('./db');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('server and client are connected')
})

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

//basic search query
app.get("/basicSearch", (req, res) => {
	var strings = (`${req.query.search}`).split(",");
	const GET_QUERY = substringSearch('title',strings);
	console.log(GET_QUERY);
	connection.query(GET_QUERY, (err, response)=>{
		if(err) console.log(err)
		else res.send(response)
	})
  })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
