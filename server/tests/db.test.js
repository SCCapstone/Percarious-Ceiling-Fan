var test = require('unit.js');
const connection = require("../db");

<<<<<<< HEAD
test.object(connection).hasProperty('host', 'localhost');//(connection.host).match('localhost')
	.value(connection.user).match('root')
	.value(connection.password).match('Percarious!')
	.value(connection.password).match('bookdata');
=======
test.value(connection.host).is('localhost')
	.value(connection.user).is('root')
	.value(connection.password).is('Percarious!')
	.value(connection.database).is('bookdata');
>>>>>>> f58d64193190665150c499bca3d5065974c082a5
