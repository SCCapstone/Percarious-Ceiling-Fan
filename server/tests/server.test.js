var test = require('unit.js');
test.httpAgent('http://localhost:3000')
.get('/')
.expect('server and client are connected')
.end(function(err, res){
    if(err) {
        test.fail(err.message);
    }
});
//test app.get (??)
//test app.listen (??)
//test getDecades
//test getLangs
//test get008Loc
//test get260Loc
//test substringSearch
//test excludeSearch
