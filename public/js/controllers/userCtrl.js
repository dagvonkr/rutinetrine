angular.module('rutineTrine').controller('userCtrl', function($scope, $state, userServ){

	$scope.error;
	$scope.user = {};

	$scope.logged_in = false; 
	$scope.user_exist= false;
	$scope.no_profile = true;
	$scope.register_err = false;


	$scope.register_employer = function() {
		
		$scope.user["user_type"] = {
			employer: true
		}
		if($scope.user.login.local.email && $scope.user.login.local.password){

			console.log('email', $scope.user.login.local.email);
			
			userServ.register($scope.user).then(function(res) {
				var id = res.data._id;
				console.log('status-->', res.status);
				if(res.status != 200){

					console.log('error registering-->',res.data);

					$scope.error = res.data.message;

					delete $scope.user.login;
					
				}else{
					userServ.login($scope.user.login.local).then(function(res){
						console.log('userServ.login=======>', res.status);
						if(res.status != 200){
							$scope.logged_in = false;
							$scope.error = res;
						}else{

							$scope.user["_id"] = id;
							$scope.logged_in = true;
							$state.go('dashboard-employer');
						}

					});	
				}
			})
		}
			
	}; 

	$scope.register_admin = function() {

		$scope.user["user_type"] = {
			admin: true
		}
		if($scope.user.login.local.email && $scope.user.login.local.password){

			console.log('email', $scope.user.login.local.email);
			
			userServ.register($scope.user).then(function(res) {
				var id = res.data._id;
				console.log('userserv.register status -->', res.status);
				if(res.status != 200){

					console.log('error registrering -->',res.data);

					$scope.error = res.data.message;

					delete $scope.user.login;
					
				}else{
					userServ.login($scope.user.login.local).then(function(res){
						console.log('userServ.login status -->', res.status);
						if(res.status != 200){
							$scope.logged_in = false;
							$scope.error = res;
						}else{

							$scope.user["_id"] = id;
							$scope.logged_in = true;
							// endre til /me ?
							$state.go('dashboard-admin');
						}

					});	
				}
			})
		}
	};



	$scope.login = function() {
		// console.log('User object-->', $scope.user);
		
		var login = {
			email: $scope.user.login.local.email,
			password: $scope.user.login.local.password
		};

		userServ.login(login).then(function(res){
			if(res.status != 200){
				console.log(res);
				$scope.error = res.data.message;
				
			}else{
				if(res.data.user_type.employer){
					$state.go('dashboard-employer');
				}else{
					$state.go('dashboard-admin');
				}
			}
		})
		$scope.user = {};	
		
	};


	$scope.clear = function(){
		$scope.user = {};
		$scope.user_exist = false;
		$scope.error = '';
	}


});