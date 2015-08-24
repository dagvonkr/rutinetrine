'use strict';

var app = angular.module('rutineTrine', ['ui.router'])

  .run(function($rootScope, $location, userServ) {
   $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === "AUTH_REQUIRED") {
        console.log("you need to be loged in dude");
        $location.path("/login");
      }
    });

    //get User state
    userServ.read_user();
  })  

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

      
    $urlRouterProvider.otherwise('/')

    $stateProvider  


      .state('landingpage', {
        url: '/',
        templateUrl: '/views/landingpage.html'     
      })

      .state('register_employer', {
        url: '/register_employer',
        templateUrl: '/views/register_employer.html',
        controller: 'userCtrl'
      })

      .state('register_admin', {
        url: '/register_admin',
        templateUrl: '/views/register_admin.html',
        controller: 'userCtrl'
      })  

      .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'userCtrl'
      })


      .state('dashboard-admin', {
          url: '/dashboard-admin',
          templateUrl: '/views/dashboard-admin.html',
          controller: 'dashboardAdminCtrl',
          resolve: {
            user: function(userServ){
              return userServ.read_admin();
            }
          }
        })

      .state('dashboard-employer', {
        url: '/dashboard-employer',
        templateUrl: '/views/dashboard-employer.html',
        controller: 'dashboardEmployerCtrl',
        resolve: {
          user: function(userServ){
            return userServ.read_employer();
          }
        }
      })


      // redirecte til login hvis det ikke er noe respons 
      $httpProvider.interceptors.push(function($location){
        return {
          'responseError': function(res){
            if(res.status === 401){
              $location.path('/login');
            }
            return res;
          }
        }
      })

        
  });
  

