angular.module('rutineTrine').controller('navCtrl', function($scope, $state, userServ){
	
	$scope.user = userServ.user;

	$scope.$on('user_changed', function(){
		// console.log('user_changed -->', userServ.user);
		var user = userServ.user;
		if(user){
			$scope.user = user;
			if($scope.user.user_type.employer){
				$scope.isEmployer = true;
			}else if($scope.user.user_type.admin){
				$scope.isAdmin = false;
			}
		}
	})

})