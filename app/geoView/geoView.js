'use strict';

angular.module('myApp.mapView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/geo/', {
            templateUrl: 'geoView/geoView.html',
            controller: 'geoViewCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])
    .controller('View1Ctrl', ['$scope','$rootScope', function($scope,$rootScope) {
        //initialize variables
        $scope.dati={};
        $scope.dati.vm = this;
        $scope.dati.vm.positions = [];
        //set the variable that is used in the main template to show the active button
        $rootScope.dati.currentView = "geo";
        //get the list of available pizzas
        //$scope.dati.pizzas = Pizza.getData();
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qAQOEvZs2XlUUu3ziu-nrDX-WWZXap4";
        //only when all data will be loaded, the map will be created
        $scope.dati.pizzas.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.pizzas.length; i++) {
                var lat = 45.071087 + (Math.random() / 100);
                var lng = 7.686567 + (Math.random() / 100);
                $scope.dati.vm.positions.push({lat: lat, lng: lng});
            }
        });
    }]);