const mysql = require('mysql2')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Precarious!.',
	database: 'bookdata'
})

module.exports = connection;
