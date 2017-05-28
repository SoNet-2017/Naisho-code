'use strict';

angular.module('myApp.userRegistrationView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userRegistration', {
    templateUrl: 'userRegistrationView/userRegistrationView.html',
    controller: 'UserRegistrationCtrl'
  });
}])

.controller('UserRegistrationCtrl', ['$scope', '$rootScope', 'Auth', 'Users', '$location', function($scope, $rootScope, Auth, Users, $location) {
    $scope.user={};
    $rootScope.dati.currentView = "home";

    $scope.signUp = function() {
        if ($scope.user.password!= '' && $scope.user.password === $scope.user.password2) {
            Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                .then(function (firebaseUser) {
                    Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(internalFirebaseUser) {
                        var userId = internalFirebaseUser.uid;
                        Users.registerNewUserInfo(userId, $scope.user.name, $scope.user.surname, $scope.user.email,$scope.user.type);
                        Users.registerLogin(userId, $scope.user.email);
                        // login successful: redirect to the pizza list
                        $location.path("/homeView");
                    }).catch(function(error) {
                        $scope.error = error;
                        console.log(error.message);
                    });
                }).catch(function (error) {
                    $scope.error = error;
                    console.log(error.message);
            });
        }
    };
}]);