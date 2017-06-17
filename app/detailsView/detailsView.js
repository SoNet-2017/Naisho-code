'use strict';

angular.module('myApp.detailsView', ['ngRoute','myApp.evento'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:eventoID', {
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
.controller('detailsViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SingleEvento',
    function($scope, $rootScope, $routeParams, SingleEvento) {
        //initialize variables
        $scope.dati = {};
        $scope.address=[];
        $scope.result=[];
 var self=this;
 self.eventoID=$routeParams.eventoID;
console.log(self);

        $scope.dati.evm = this;
        $scope.dati.evm.positions = [];
        //set the variable that is used in the main template to show the active button
        //$rootScope.dati.currentView = "home";
        //get the information of the evento with Id like the one that was passed in the URL path
        //$scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoID);
        $scope.dati.evento = SingleEvento.getSingleEvento(self);
        console.log("questo è l'evento Id da detailsView",$routeParams.eventoID);
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qAQOEvZs2XlUUu3ziu-nrDX-WWZXap4";
        //when the information about the pizza will be loaded, then the map will be created adding a marker in the location
        $scope.dati.evento.$loaded().then(function () {
            console.log($scope.dati.evento);
            $scope.address = $scope.dati.evento.Indirizzo;
            // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
           // address = address || 'Ferrol, Galicia, Spain';
            // Initialize the Geocoder
            $scope.geocoder = new google.maps.Geocoder();
            if ($scope.geocoder) {
                $scope.geocoder.geocode({
                    'address': $scope.address
                },
                    $scope.cambia=function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        $scope.dati.positions = {lat: results.geometry.location.lat() , lng: results.geometry.location.lng()};
                    }
                });
            }
            $scope.dati.evm.positions.push({Indirizzo: $scope.dati.positions});
            console.log($scope.address);
        });
    }]);