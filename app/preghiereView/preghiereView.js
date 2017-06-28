'use strict';

angular.module('myApp.preghiereView', ['ngRoute','myApp.prega'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/preghiereView', {
            templateUrl: 'preghiereView/preghiereView.html',
            controller: 'preghiereViewCtrl',
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

    .controller('preghiereViewCtrl', ['$scope', '$rootScope', '$firebaseObject','Prega','$firebaseAuth',
        function($scope, $rootScope, $firebaseObject,Prega,$firebaseAuth) {
            //initialize variables
            $scope.preghiereDaMostrare=[];
            $scope.userId = firebase.auth().currentUser.uid;
            $scope.preghiere=[];
            console.log($scope.userId);
            $scope.preghiere = Prega.getData();

            $scope.preghiere .$loaded().then(function () {
                console.log($scope.preghiere);
                for (var i=0;i< $scope.preghiere.length; i++){
                     //console.log($scope.preghiere[i]);
                     console.log($scope.preghiere[i].userId);
                    if ($scope.preghiere[i].userId===$scope.userId){
                        console.log("sono qui")
                        $scope.preghiereDaMostrare.push($scope.preghiere[i]);}
                }
            });
            console.log($scope.preghiereDaMostrare);

        }]);