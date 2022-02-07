var test    = require('unit.js');
var express = require('express');
var app     = express();
//var server = require('../server');
describe('GET /', function() {
    it('respond with connection string', function(done) {


        test.httpAgent('http://localhost:3001')
        .get('/')
        .expect('server and client are connected')
        //.expect('server and client are connected')
        .end(function(err, res){
            if(err) {
                test.fail(err.message);
            }
        });
        done()
    })
})
//test app.get (??)
//test app.listen (??)
//test getDecades
//test getLangs
//test get008Loc
//test get260Loc
//test substringSearch
//test excludeSearch
