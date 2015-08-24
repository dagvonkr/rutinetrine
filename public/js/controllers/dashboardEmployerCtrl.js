angular.module('rutineTrine').controller('dashboardEmployerCtrl', function($scope, $state, user, userServ, $location){

	$state.user = user;
	$scope.user = user;

	var uniqueUserId = user._id;

	userServ.read_user().then(function(data){
		console.log('dashboardEmployerCtrl user-->', data);
       $scope.user = data;
     },function(err){
   });


})