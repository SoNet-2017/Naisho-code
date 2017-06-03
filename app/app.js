
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
    'myApp.userRegistrationView'
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
    .controller('MainCtrl', ['$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged

        //set the variable that is used in the main template to show the active button
        $rootScope.dati = {};
        $scope.isLogged = function()
        {
            if ($firebaseAuth().$getAuth())
                return true;
            else
                return false;
        }
    }]);
/*.config(function($routeProvider){
 $routeProvider.when("/utenti",{...})
 .when("/utenti/:userId",{...})
 .otherwise({redirectTo:"/utenti"});
 })*/
