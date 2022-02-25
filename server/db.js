const mysql = require('mysql2')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Ewhzfig4.',
	database: 'bookdata'
})

module.exports = connection;
 