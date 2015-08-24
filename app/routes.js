
//model controllers
var userCtrl = require('../App/controllers/userCtrl');
var rutineCtrl = require('../App/controllers/rutineCtrl');
var passwordCtrl = require('../App/controllers/passwordCtrl');



module.exports = function(app, passport){


	// <3 AUTH <3

	var requireAuth = function(req,res,next){
		if(!req.isAuthenticated()){
			return res.status(401).end();
		}
		console.log(req.user);
		next();
	}
	//auth for admin
	var requireAuthAdmin = function(req , res , next) {
		if(req.user){
			console.log("authorizing-admin: ", req.user);
			if(req.user.user_type.admin && req.isAuthenticated()){
				return next();
			}
		}
		return res.status(401).end();
	}

	//auth for employer
	var requireAuthEmployer = function(req,res,next){
		console.log('authorizing-employer: ', req.user);
		if(req.user){
			if(req.user.user_type.employer && req.isAuthenticated()){
				return next();
			}
		}
		return res.status(401).end();

	}


	// endpoints

	//login / logout
	app.post('/user/login', passport.authenticate('local', { failureRedirect: '/#/' }), function(req, res){
		return res.send(req.user);
	})

	app.get('/user/logout', function(req, res){
		req.logout();
		res.redirect('/')
	})





	//users
	app.post('/user', userCtrl.create);
	app.post('/user/rutines', rutineCtrl.userRutines);
	app.get('/user', userCtrl.readAll);
	app.get('/user/read', userCtrl.readOne);
	app.put('/user/:userId', userCtrl.update);
	app.delete('/user/:userId', userCtrl.delete);


	var User = require("./models/User");

	//admin
	app.get('/admin/me', requireAuthAdmin, userCtrl.readMe);

	//employer
	app.get('/employer/me', requireAuthEmployer, userCtrl.readMe);

	// current
	app.get('/me', userCtrl.readMe);



	//rutine
	app.post('/api/rutine', requireAuthAdmin, rutineCtrl.create);
	app.get('/api/rutine', rutineCtrl.read);
	app.get('/api/rutine/read', rutineCtrl.readOne);
	app.put('/api/rutine/update/:rutineId', rutineCtrl.update);
	app.put('/api/rutine/finish', requireAuth, rutineCtrl.finish);
	app.delete('/api/rutine/delete/:projectId', requireAuthAdmin, rutineCtrl.delete);




}