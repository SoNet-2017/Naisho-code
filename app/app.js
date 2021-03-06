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
    'ngMap',
    'myApp.addEventoView',
    'myApp.addForumView',
    'myApp.addPostView',
    'myApp.calendarView',
    'myApp.changeImageView',
    'myApp.chatView',
    'myApp.authentication',
    'myApp.evento',
    'myApp.fileUpload',
    'myApp.forum',
    'myApp.post',
    'myApp.prega',
    'myApp.users',
    'myApp.detailsView',
    'myApp.editProfileView',
    'myApp.geoView',
    'myApp.searchView',
    'myApp.homeView',
    'myApp.loginView',
    'myApp.newsView',
    'myApp.OtherUserProfile',
    'myApp.pregaView',
    'myApp.preghiereView',
    'myApp.singleForumView',
    'myApp.singlePostView',
    'myApp.tutorView',
    'myApp.userProfileView',
    'myApp.userRegistrationView',
    'myApp.usersListView',
    'myApp.users.usersListService'
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
    .controller('MainCtrl',  ['$scope', '$rootScope', '$firebaseAuth', '$location', 'Auth', 'Users', function($scope, $rootScope, $firebaseAuth, $location, Auth, Users) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged

        //set the variable that is used in the main template to show the active button
        $rootScope.dati = {};
        $scope.auth = Auth;
        //creare una funzione per richiamare questo $firebaseAuth().$getAuth().CurrentUser)
        //if ($firebaseAuth().$getAuth()!=null)
        //{console.log("ciao"+$firebaseAuth().$getAuth().CurrentUser);}
        $scope.isLogged = function () {
            if ($firebaseAuth().$getAuth())
                return true;
            else
                return false;
        }

        $scope.logout = function () {
            //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
            Users.registerLogout($firebaseAuth().$getAuth().uid);
            //sign out
            $firebaseAuth().$signOut();
            $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    console.log("User is yet signed in as:", firebaseUser.uid);
                } else {
                    $location.path("/loginView");
                }
            });


        };

        // menu a comparsa
        $scope.show = function () {
            //document.getElementById("menu").style.left = "0px";
            document.getElementById("menu").style.display = "flex";
        };
        $scope.closeMenu = function () {
            //document.getElementById("menu").style.left = "-250px";
            document.getElementById("menu").style.display = "none";
        };



    }]);




