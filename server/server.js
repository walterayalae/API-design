var express= require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp')


var app= express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
	res.send('It is working');

});

app.use('/api', router);


app.listen(port);
console.log('listening on port' + port);