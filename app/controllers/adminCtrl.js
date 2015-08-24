
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');

module.exports = {

	create: function(req,res){
		var admin = new Client(req.body);
		admin.save(function(err, saved){
			if(err){
				console.log('client NOT saved: ', err);
			}
			res.send(saved);
		})
	},

	readAll: function(req,res){
		Admin.find().exec().then(function(found){
			if(!found){
				res.status(404).end();
			}
			res.send(found);
		})
	},

	readMe: function(req,res){
		res.send(req.user);
	}

	// her skal vel update og delete og litt sån kommer:

	
}