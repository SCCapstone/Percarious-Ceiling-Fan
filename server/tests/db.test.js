var test = require('unit.js');
const connection = require("../db");

test.value(connection.host).match('localhost')
	.value(connection.user).match('root')
	.value(connection.password).match('Percarious!')
	.value(connection.password).match('bookdata');