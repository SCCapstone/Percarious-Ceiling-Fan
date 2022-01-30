var test = require('unit.js');
const connection = require("../db");

test.value(connection.host).is('localhost')
	.value(connection.user).is('root')
	.value(connection.password).is('Percarious!')
	.value(connection.database).is('bookdata');