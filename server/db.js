const mysql = require('mysql2')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Percarious!',
	database: 'bookdata'
})

module.exports = connection;