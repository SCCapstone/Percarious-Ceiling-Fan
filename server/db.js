const mysql = require('mysql2')
//this sets up our connection to sql
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Precarious!',
	database: 'bookdata'
})

module.exports = connection;
 