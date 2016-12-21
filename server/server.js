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
			var user = new User();
			user.name = req.body.name;
			user.lastName = req.body.lastName;

			user.save(function(err){
				if(err)
					res.send(err);

				res.json({msg: 'User created!'});

			});
		})

		.get(function(req, res){
			User.find(function(err, users){
				if(err)
					res.send(err);

				res.json(users);

			});
		});

router.route('/users/:id')

	.get(function(req, res){
		User.findById(req.params.id, function(err, user){
			if(err)
				res.send(err);

			res.json(user);

		});


	})

	.put(function(req, res){

		User.findById(req.params.id, function(err, user){
			if(err)
				res.send(err);

			user.name = req.body.name;
			user.lastName = req.body.lastName;

			user.save(function(err){
				if(err)
					res.send(err);

				res.json('User updated!');

			});

		});
	})

	.delete(function(req, res){
		User.remove({
			_id:req.params.id
		}, function(err, user){
			if(err)
				res.send(err);

			res.json('User deleted!')
		});


	})

app.use('/api', router);


app.listen(port);
console.log('listening on port' + port);