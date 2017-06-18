'use strict';

angular.module('myApp.geoView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/geoView/' , {
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

    .controller('geoViewCtrl', ['$scope', '$rootScope','$firebaseAuth','$routeParams','UserList',
        function($scope, $rootScope, $firebaseAuth, $routeParams, UserList){
//initialize variables
            $scope.dati = {};
            $scope.address= {};
            $scope.pos = {};
            //$scope.userId = {};
            $scope.coordinate = {};
            $scope.lat = {};
            $scope.lng = {};



//set the variable that is used in the main template to show the active button


            $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qAQOEvZs2XlUUu3ziu-nrDX-WWZXap4";
            $scope.geo = navigator.geolocation.getCurrentPosition(function(position) {

                $scope.pos.lat = position.coords.latitude;
                $scope.pos.lng = position.coords.longitude;

                //console.log("userId utente da geoview:", userId);
               // $scope.address = {lat: $scope.pos.lat, lng: $scope.pos.lng};
               // InsertGeocoordService.insertNewcoordinate($scope.address, userId);
               // console.log("coordinate utente da geoview:", $scope.address);

            });

            $scope.dati.listaUtenti = UserList.getListOfUsers();
            $scope.dati.userId = $firebaseAuth().$getAuth().uid;
            $scope.dati.listaUtenti.$loaded().then(function () {
                for (var i=0;i<$scope.dati.listaUtenti.length; i++){
                    if ($scope.dati.userId!== $scope.dati.listaUtenti[i].$id && $scope.dati.listaUtenti[i].logged===true){
                        //for (var b=0;i<($scope.dati.listaUtenti.length*2); b=+2){
                        $scope.lat=$scope.dati.listaUtenti[i].address.lat;
                        $scope.lng=$scope.dati.listaUtenti[i].address.lng;

                console.log("lat e lng di tutti", $scope.lat, $scope.lng);
                //$scope.dati.vm.positions.push({address: address});
                    //}
                }}});

           // console.log("vediamo cosa è dati.listaUtenti:",  $scope.dati.listaUtenti);
           // var c=$scope.listaUtenti.$keyAt($scope.listaUtenti[1]);
          //  console.log("quanto vale $scope.listaUtenti.length", c);

          // for (var i=0;i<$scope.listaUtenti.length; i++){
            //   console.log("quanto vale $scope.dati.availableUsers.length", $scope.dati.availableUsers.length);
            //    if ($scope.userId!== $scope.dati.availableUsers.$keyAt(i).$id) {
            //        console.log("siamo dentro l'if");
             //      $scope.lat[i]=$scope.dati.availableUsers.$keyAt(i).address.lat;
             //      $scope.lng[i]=$scope.dati.availableUsers.$keyAt(i).address.lng;
             //      console.log("vediamo cosa salva il for:",  $scope.lat[i],$scope.lng[i]);

              // }
           // }

        }]);



