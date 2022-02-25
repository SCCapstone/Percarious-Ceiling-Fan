const mysql = require('mysql2')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Jrcm8616!!',
	database: 'bookdatacut'
})

module.exports = connection;
 