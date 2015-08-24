var mongoose = require('mongoose');
var Employer = mongoose.model('Employer');

module.exports = {

	create: function(req, res){
		var employer = new Employer(req.body);
		
		employer.save(function(err, saved){
			if(err)res.status(500).send(err);
			res.send(saved);
		})
	},

	readAll: function(req,res){
		Employer.find().exec().then(function(found){
			if(!found) res.status(404).send(err);
			res.send(found);
		})
	},

	readOne: function(req,res){
		Employer.findOne({_id: req.params.cmployerId}).exec().then(function(found){
			
			console.log("reading employer: ", req.params.employerId);

			if(!found)res.status(404).send(err);
			res.send(found);
		})
	},

	update: function(req, res){
		Employer.findByIdAndUpdate(req.params.id, req.body, function(err, updated){
			if(err)res.status(500).send(err);
			res.send(updated);
		})
	},

	delete: function(req,res){
		Employer.findByIdAndRemove(req.params.employerId, function(err, gone){
			if(err)res.status(500).send(err);
			res.send(gone);
		})
	}
}