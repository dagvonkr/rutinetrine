angular.module('rutineTrine').service('rutineServ', function($http, $q) {


  this.getRutine = function(rutineId) {
    
    var defer = $q.defer();

    $http( {
      method: 'GET',
      url: "/api/rutine"

    })
    .then(function(RutineObj) {
      console.log('get rutine user.Serv -->', RutineObj)

      if(RutineObj.status === 404) {
        console.log("Error listing rutine")
      } else {
        defer.resolve(RutineObj.data)
      }

      defer.reject("Error resolving")

    });

    return defer.promise;

  };

  this.postRutine = function(newRutine) {
  console.log("Ny rutine -->", newRutine);
    var defer = $q.defer();
    $http({
      method: 'POST',
      url: "/api/rutine",
      data: newRutine
    }).then(function (newRutine) {
      // Here's the problem: I get the array in the service but I don't get it to be resolved.
     console.log('Ny rutine resolved-->', newRutine); 
     defer.resolve(newRutine)
    });
    return defer.promise;
  }

});