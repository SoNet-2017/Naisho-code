'use strict';

angular.module('myApp.geoView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/geoView/', {
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

    .controller('geoViewCtrl', ['$scope', '$rootScope', 'InsertGeocoordService',
        function($scope, $rootScope,InsertGeocoordService){
//initialize variables
            $scope.dati = {};
            $scope.dati.vm = this;
            $scope.dati.vm.positions = [];

//set the variable that is used in the main template to show the active button
            $rootScope.dati.currentView = "geoView";
            $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qAQOEvZs2XlUUu3ziu-nrDX-WWZXap4";
            $scope.geo = navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = $scope.dati.vm.positions.push({lat: position.coords.latitude, lng: position.coords.longitude});
                InsertGeocoordService.updatecoordinate($firebaseUser.uid);
                $scope.address = pos;

                });
//}
//});
        }]);



