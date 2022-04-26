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
    it('check if basic search is on', function(done) {

        test.httpAgent('httm://localhost:3001')
        .get('/basicSearch')
        .expect(!"anything useful")
        .end(function(err,res) {
            if(err) {
                test.fail(err.message);
            }
        });
        done()
    })
    it('check if advanced search is on', function(done) {

        test.httpAgent('httm://localhost:3001')
        .get('/advancedSearch')
        .expect(!"anything useful")
        .end(function(err,res) {
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
