const mysql = require('mysql2')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Precarious!',
	database: 'bookdatacut'
})

module.exports = connection;
 