var test = require('unit.js');
const connection = require("../db");

test.object(connection).hasProperty('host', 'localhost');//(connection.host).match('localhost')
	.value(connection.user).match('root')
	.value(connection.password).match('Percarious!')
	.value(connection.password).match('bookdata');