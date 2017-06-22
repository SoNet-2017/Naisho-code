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

    .controller('geoViewCtrl', ['$scope', '$rootScope','$firebaseAuth','$routeParams','UserList','UsersChatService',
        function($scope, $rootScope, $firebaseAuth, $routeParams, UserList,UsersChatService){
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

            });

            $scope.dati.listaUtenti = UserList.getListOfUsers();
            $scope.dati.userId = $firebaseAuth().$getAuth().uid;
            $scope.dati.listaUtenti.$loaded().then(function () {
                $scope.tutti = function() {
                    for (var i=0;i<$scope.dati.listaUtenti.length; i++){
                        if ($scope.dati.userId!== $scope.dati.listaUtenti[i].$id && $scope.dati.listaUtenti[i].logged===true){

                            $scope.lat=$scope.dati.listaUtenti[i].address.lat;
                            $scope.lng=$scope.dati.listaUtenti[i].address.lng;
                            $scope.nome=$scope.dati.listaUtenti[i].name  +' '+  $scope.dati.listaUtenti[i].surname;

                            console.log("lat e lng di tutti", $scope.lat, $scope.lng);
                        }}};

                $scope.buddisti = function() {
                    for (var i=0;i<$scope.dati.listaUtenti.length; i++){
                        if ($scope.dati.userId!== $scope.dati.listaUtenti[i].$id
                            && $scope.dati.listaUtenti[i].logged===true
                            && $scope.dati.listaUtenti[i].buddista==='si'){

                            $scope.lat=$scope.dati.listaUtenti[i].address.lat;
                            $scope.lng=$scope.dati.listaUtenti[i].address.lng;
                            $scope.nome=$scope.dati.listaUtenti[i].name +' '+ $scope.dati.listaUtenti[i].surname;

                            console.log("lat e lng di tutti", $scope.lat, $scope.lng);
                        }}};

                $scope.tutor = function() {
                    for (var i=0;i<$scope.dati.listaUtenti.length; i++){
                        if ($scope.dati.userId!== $scope.dati.listaUtenti[i].$id
                            && $scope.dati.listaUtenti[i].logged===true
                            && $scope.dati.listaUtenti[i].buddista==='no'){

                            $scope.lat=$scope.dati.listaUtenti[i].address.lat;
                            $scope.lng=$scope.dati.listaUtenti[i].address.lng;
                            $scope.nome=$scope.dati.listaUtenti[i].name +' '+ $scope.dati.listaUtenti[i].surname;

                            console.log("lat e lng di tutti", $scope.lat, $scope.lng);
                        }}};


            });
        }]);



