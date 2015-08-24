angular.module('rutineTrine').service('userServ', function($http, $q, $rootScope){

	var userServ = this;

	var register_url= '/user';
	var login_url= '/user/login';


	this.register = function(user) {

		var defer = $q.defer();

		$http({ 
			method: 'POST', 
			url: register_url,
			data: user

		}).then(function(res) {
			userServ.read_user();
			defer.resolve(res);
		}, function(err) {
			defer.reject(err);
		})

		
		return defer.promise;

	}

	
	this.login = function(user) {
		var defer = $q.defer();

		$http({
			method: 'POST', 
			url: login_url, 
			data: user

		})
		.then(function(res) {
			userServ.read_user();
			defer.resolve(res);
		},function(err){
			defer.reject(err);
		})

		return defer.promise;
	},

	this.read_user = function(){
		var defer = $q.defer();
		$http({
			method:"GET",
			url: "/me"
		}).then(function(res){
			userServ.user = res.data;
			defer.resolve(res.data);
			$rootScope.$broadcast('user_changed');
		}, function(err){
			defer.reject(err.data);
		})

		 return defer.promise;
	}


	this.read_employer = function(){

		var defer = $q.defer();

		$http({
			method: 'GET',
			url:  '/employer/me'
		}).then(function(res){
			console.log('CB fra read_employer', res);
			defer.resolve(res.data);
		}).catch(function(err){
			defer.reject(err.data);
		})

		return defer.promise;
	}

	this.read_admin = function(){

		var defer = $q.defer();

		$http({
			method: 'GET',
			url:  '/admin/me'
		}).then(function(res){
			console.log('CB fra read_admin', res);
			defer.resolve(res.data);
		}).catch(function(err){
			defer.reject(err.data);
		})

		return defer.promise;
	}

	this.employer_list = function(){

		var defer = $q.defer();

		$http({
			method: 'GET',
			url: '/user'
		}).then(function(res){

		// Filtrerer gjennom employer = true	
		var employerList = []	
			for (var i = 0; i < res.data.length; i++) {
				if (res.data[i].user_type.employer){
					employerList.push(res.data[i]);	
				}
			}
		
		defer.resolve(employerList)	
		
		}).catch(function(err){
			defer.reject(err.data);
		})

		return defer.promise;
	}

	this.update_user_with_rutine = function(rutine) {

		console.log('rutine object i update_user_with_rutine -->', rutine);

		var id = rutine.assignment.assigned_to._id; // dette er riktig id

		console.log('rutine._id -->', rutine.rutine_id); 
		var assigned_rutine = rutine.rutine_id; // det er ikke noe _id her

		

		var defer = $q.defer();

		$http({
			method: 'PUT',
			url: '/user/' + id, // dette er riktig id
			data: {rutiner: assigned_rutine} 
		}).then(function(res){

			defer.resolve(res)

		}).catch(function(err){
			defer.reject(err)
		})

		return defer.promise;
	}




	this.user = null;
});