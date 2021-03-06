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


    $scope.signUp = function() {
        if ($scope.user.password!= '' && $scope.user.password === $scope.user.password2 ) {
            Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                .then(function (firebaseUser) {
                    //create a new user with specified email and password
                    Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(internalFirebaseUser) {
                        var userId = internalFirebaseUser.uid;

                        Users.registerNewUserInfo(userId, $scope.user.name, $scope.user.surname,$scope.user.email,$scope.user.type,$scope.user.buddista);
                        Users.registerLogin(userId, $scope.user.email);
                        // login successful: redirect to the home
                        $location.path("/homeView");
                    }).catch(function(error) {
                        $scope.error = error;
                        console.log(error.message);
                        $location.path("/userRegistrationView");

                    });
                }).catch(function (error) {
                    $scope.error = error;
                    console.log(error.message);
                $location.path("/userRegistrationView");

            });
        }
    };
}]);