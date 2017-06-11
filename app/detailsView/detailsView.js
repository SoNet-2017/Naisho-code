'use strict';

angular.module('myApp.detailsView', ['ngRoute','myApp.pizza'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detailsPizza/:userId', {
    templateUrl: 'detailsView/detailsView.html',
    controller: 'detailsViewCtrl',
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
//Inline Array Annotation
    //Here we pass an array whose elements consist of a list of strings (the names of the dependencies)
    // followed by the function itself.
    //When using this type of annotation, take care to keep the annotation array
    // in sync with the parameters in the function declaration.
.controller('detailsViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SinglePizza',
    function($scope, $rootScope, $routeParams, SinglePizza) {
        //initialize variables
        $scope.dati = {};

        $scope.dati.vm = this;
        $scope.dati.vm.positions = [];


        //get the information of the pizza with Id like the one that was passed in the URL path

        $scope.getcoordinates = function (userId) {
            var ref = firebase.database().ref().child("users").child(userId);
            // download the data into a local object
            return $firebaseObject(ref);
        }
        $scope.dati.pizza = SinglePizza.getcoordinates($routeParams.userId);

        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qAQOEvZs2XlUUu3ziu-nrDX-WWZXap4";
        $scope.geo = navigator.geolocation.getCurrentPosition(function(position) {
            var pos = $scope.dati.vm.positions.push({lat: position.coords.latitude, lng: position.coords.longitude});


            //$scope.dati.vm.positions.push({address: address});
        });
    }]);