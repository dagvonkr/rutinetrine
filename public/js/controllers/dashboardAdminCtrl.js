angular.module('rutineTrine').controller('dashboardAdminCtrl', function($scope, user, userServ, rutineServ, $location, $window){

  $scope.user = user;

  rutineServ.getRutine().then(function(res){
    console.log('Leser rutine i ctrl -->', res);
    $scope.readRutine = res;
  })


  $scope.submitRutine = function(newRutine) {

    console.log('ny rutine fra view-->', newRutine);

    // sender _id til user så vi vet hvem som poster
    newRutine.assignment.assigned_by = user._id;
    rutineServ.postRutine(newRutine).then(function(res) {

      console.log ("posting new rutine res -->", res)
      userServ.read_user().then(function(res) {
        $scope.user = res;
        $scope.newRutine = {};
        // en liten quick-fix refresh
        $window.location.reload();
      })

    }, function(err){
        console.log(err);
    })
  }


    // liste over employers  
  userServ.employer_list().then(function(res){
        console.log('$scope.employers-->', res)

        $scope.employers = res; 
        

      }, function(err) {
        console.log('Error getting emplyer_list', err)
      })
 


})

