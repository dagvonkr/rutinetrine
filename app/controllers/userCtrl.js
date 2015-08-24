var mongoose = require('mongoose');
var User = mongoose.model('User');

var fs = require("fs")


module.exports = {

	create: function(req, res){
		console.log(req.body.login.local);

		User.findOne({"login.local.email": req.body.login.local.email}, function(err, found){
			console.log(found);

			//if user already exists
			if(found){
				return res.status(500).json({message: "user with that email already exists ", err: "email"});
			}

			//if password too short
			if(req.body.login.local.password.length <= 5){
				 
			}
			
			//create and save user
			var user = new User(req.body);
			user.save(function(err, saved){
				if(err){
					console.log("User not created");
					return res.status(500).json({message: "err creating user, please try again", err: 20});
				}				

				console.log('User created!');
				res.send(saved);					
			})
		})
			
	},

	readAll: function(req,res){
		User.find({})
			.populate('rutiner')
			.exec().then(function(found){
			if(!found) res.status(404).end();
			res.send(found);
		})
	},

	
	readMe: function(req,res){
		if(req.user){
			User.findOne({_id:req.user._id})
				.populate("rutiner")
				.populate("completed_rutiner")
				.exec().then(function(found){
					if(!found){
					res.status(404).end();
					}
				res.send(found);	
				})
		}else{
			res.status(404).end();
		}
	},
	
	readOne:function(req,res){
		User.findOne({_id: req.query.id}).exec().then(function(found){
			if(!found){
				res.status(404).end();

			}
			res.send(found);
		})
	},

	update: function(req,res){
		User.findByIdAndUpdate(req.params.userId, req.body, function(err, result){
			if(err){
				console.log(result);
				res.status(500).end();
			}
			console.log(result);
			res.send(result);
		})
	},

	delete: function(req,res){
		User.findByIdAndRemove(req.params.userId, function(err,res){
			if(err){
				res.status(500).end();
			}
			res.send(res);
		})
	}

	
}