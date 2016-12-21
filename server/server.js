var express= require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp')


var app= express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
	console.log('It is happening');

	next();
});

router.get('/', function(req, res){
	res.send('It is working');

});

var User = require('../models/user');

router.route('/users')
		
		.post(function(req, res){
			console.log('res', req.body)
			var user = new User();
			user.name = req.body.name;
			user.lastName = req.body.lastName;

			user.save(function(err){
				if(err)
					res.send(err);

				res.json({msg: 'User created!'});

			});

		});

app.use('/api', router);


app.listen(port);
console.log('listening on port' + port);