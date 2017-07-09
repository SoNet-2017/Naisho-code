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

    .controller('geoViewCtrl', ['$scope', '$rootScope','$firebaseAuth','$routeParams','$window','$location','UserList','UsersChatService',
        function($scope, $rootScope, $firebaseAuth, $routeParams,$window,$location, UserList,UsersChatService){
//initialize variables
            $scope.dati = {};
            $scope.address= {};
            $scope.pos = {};
            //$scope.userId = {};
            $scope.coordinate = {};
            $scope.lat = {};
            $scope.lng = {};
            $scope.dati.vm = this;
            $scope.dati.vm.positions = []; // array con posizioni di tutti
            $scope.dati.vm.posBudd = [];   // array con posizioni solo buddisti
            $scope.dati.vm.posTutor = [];  // array con posizioni solo tutor

            //variabili per dedicede cosa mostrare sulla mappa, inizialmente tutte "false", si mostra solo la posizione dell'user
            $scope.showAll=false;
            $scope.showBudd=false;
            $scope.showTutor=false;


            $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qAQOEvZs2XlUUu3ziu-nrDX-WWZXap4";

            //posizione user
            $scope.geo = navigator.geolocation.getCurrentPosition(function(position) {
                $scope.pos.lat = position.coords.latitude;
                $scope.pos.lng = position.coords.longitude;
                console.log("my position", $scope.pos.lat, $scope.pos.lng);
            });

            $scope.dati.listaUtenti = UserList.getListOfUsers();
            $scope.dati.userId = $firebaseAuth().$getAuth().uid;
            $scope.dati.listaUtenti.$loaded().then(function () {
                //per ogni utente della lista controllo se è buddista e se è tutor,
                // a seconda delle variabili lo metto nell'array solo buddisti, in quello solo tutor o in quello contenente tutti
                for (var i=0;i<$scope.dati.listaUtenti.length; i++){
                    if ($scope.dati.userId!== $scope.dati.listaUtenti[i].$id && $scope.dati.listaUtenti[i].logged===true) {
                        if ($scope.dati.listaUtenti[i].buddista === 'Sì') {
                            var lat = $scope.lat = $scope.dati.listaUtenti[i].address.lat;
                            var lng = $scope.lng = $scope.dati.listaUtenti[i].address.lng;
                            var person = UsersChatService.getUserInfo($scope.dati.listaUtenti[i].$id);
                            //var si=false;
                            $scope.dati.vm.posBudd.push({lat: lat, lng: lng, info: person});
                            $scope.dati.vm.positions.push({lat: lat, lng: lng, info: person});
                            console.log("lat e lng Buddisti", $scope.dati.vm.posBudd);
                        }
                        else if ($scope.dati.listaUtenti[i].tutor === 'Sì') {
                            var lat = $scope.lat = $scope.dati.listaUtenti[i].address.lat;
                            var lng = $scope.lng = $scope.dati.listaUtenti[i].address.lng;
                            var person = UsersChatService.getUserInfo($scope.dati.listaUtenti[i].$id);
                           // var si=false;
                            $scope.dati.vm.posTutor.push({lat: lat, lng: lng, info: person});
                            $scope.dati.vm.positions.push({lat: lat, lng: lng, info: person});
                            console.log("lat e lng Tutor", $scope.dati.vm.posTutor)
                        }
                        else {
                            var lat = $scope.lat = $scope.dati.listaUtenti[i].address.lat;
                            var lng = $scope.lng = $scope.dati.listaUtenti[i].address.lng;
                            var person = UsersChatService.getUserInfo($scope.dati.listaUtenti[i].$id);
                            //var si=false;
                           // $scope.dati.vm.positions.push({lat: lat, lng: lng, info: person,si:si});
                            $scope.dati.vm.positions.push({lat: lat, lng: lng, info: person});
                            console.log("lat e lng di tutti", $scope.dati.vm.positions);
                        }
                    }
                }

                $scope.tutti = function() {
                    $scope.showAll=true;
                    $scope.showBudd=false;
                    $scope.showTutor=false;
                };

                $scope.buddisti = function() {
                    $scope.showAll=false;
                    $scope.showBudd=true;
                    $scope.showTutor=false;
                };

                $scope.solotutor = function() {
                    $scope.showAll=false;
                    $scope.showBudd=false;
                    $scope.showTutor=true;
                };

            });
        }]);



