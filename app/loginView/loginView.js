'use strict';

angular.module('myApp.loginView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/loginView', {
            templateUrl: 'loginView/loginView.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', 'Auth', '$location', '$log', 'Users', function($scope, Auth, $location, $log,Users) {
        $scope.user={};
        $scope.dati={};
        $scope.error = "";
        $scope.auth = Auth; //acquires authentication from app.js (if it was done)
        var database = firebase.database();


        $scope.signIn = function() {
            $scope.firebaseUser = null;
            $scope.error = null;
            $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
                var userId = firebaseUser.uid;
                Users.registerLogin(userId, $scope.user.email);
                // login successful: redirect to HOME
                $location.path("/homeView");
            }).catch(function(error) {
                $scope.error = error;
                $log.error(error.message);
            });


        };
    }]);