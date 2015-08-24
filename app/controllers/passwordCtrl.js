var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = {

	create: function(req,res){
		console.log('looking for --> ', req.body.email);
		User.findOne({"login.local.email": req.body.email}, function(err, found){
			
			console.log('found -->', found);

			if(!found){
				res.status(404).json({message: "user not found"});
				
			}else{
				
				res.status(200).json({message: "dagdagdag", user: found});
			}
		})
	},

	check: function(req, res){
		if(req.body.entered === req.body.given){
			console.log('check --> success');
			res.status(200).json({message: "success"})
		}else{
			console.log('check --> failure');
			res.status(500).json({message: "didnt match" })
		}
	}
}