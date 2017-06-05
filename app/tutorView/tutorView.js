'use strict';

angular.module('myApp.tutorView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/tutor/', {
            templateUrl: 'tutorView/tutorView.html',
            controller: 'tutorViewCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        })
    }])
    .controller('tutorViewCtrl', ['$scope', '$rootScope', '$routeParams', 'currentAuth',
        function($scope, $rootScope, $routeParams, currentAuth){
            //initialize variables
            $scope.dati = {};


        }]);