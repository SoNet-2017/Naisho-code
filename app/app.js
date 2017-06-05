
'use strict';

// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyB25qzSL59ESy04SBFhwbXJVdCjEKEFapc",
    authDomain: "naisho-124b5.firebaseapp.com",
    databaseURL: "https://naisho-124b5.firebaseio.com",
    projectId: "naisho-124b5",
    storageBucket: "naisho-124b5.appspot.com",
    messagingSenderId: "511020877316"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myApp', [
    "firebase",
    'ngRoute',
    'myApp.users',
    'myApp.homeView',
    'myApp.loginView',
    'myApp.users',
    'myApp.usersListView',
    'myApp.chatView',
    'myApp.authentication',
    'myApp.userProfileView',
    'myApp.userRegistrationView',
   // 'myApp.tutorView',
    'myApp.pregaView',
     'myApp.mapView',
   // 'myApp.editProfileView',
  //  'myApp.calendarView'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/homeView'});
    }])
    .run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/loginView");
            }
        });
    }])
    .controller('MainCtrl', ['$scope','$location', 'Auth','$rootScope', '$firebaseAuth', function($scope,$location,Auth, $rootScope, $firebaseAuth) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged

        //set the variable that is used in the main template to show the active button
        $rootScope.dati = {};
        $scope.auth=Auth;
        $scope.isLogged = function()
        {
            if ($firebaseAuth().$getAuth())
                return true;
            else
                return false;
        }

        //logout
        $scope.logout = function () {
           // Users.registerLogout(currentAuth.uid);
            $firebaseAuth().$signOut();
            $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    console.log("User is yet signed in as:", firebaseUser.uid);
                } else {
                    $location.path("/loginView");
                }
            });
        };

        // menu a comparsa
        $scope.show = function () {
            document.getElementById("menu").style.left = "0px";
        };
        $scope.close= function()  {
            document.getElementById("menu").style.left = "-250px";
        };
    }]);
/*.config(function($routeProvider){
 $routeProvider.when("/utenti",{...})
 .when("/utenti/:userId",{...})
 .otherwise({redirectTo:"/utenti"});
 })*/
