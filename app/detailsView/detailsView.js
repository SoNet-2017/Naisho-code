'use strict';

angular.module('myApp.detailsView', ['ngRoute','myApp.evento',])

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
.controller('detailsViewCtrl', ['$scope', '$rootScope', '$routeParams', 'SingleEvento','Evento','currentAuth','$window',
    function($scope, $rootScope, $routeParams, SingleEvento,Evento,currentAuth,$window) {
        //initialize variables
        $scope.dati = {};
        $scope.address=[];
        $scope.result=[];
        $scope.dati.userId = currentAuth.uid;

        $scope.dati.evm = this;
        $scope.dati.evm.position = [];
        $scope.inviti=[];

        $scope.dati.evento = SingleEvento.getSingleEvento($routeParams.eventoID);

       // console.log("questo è l'id dell'evento da detailsView",$routeParams.eventoID);


        $scope.listaUtenti=Evento.getListOfUsers();
        $scope.inviti=Evento.getInviti();
        $scope.invitatiEvento=[];
        $scope.nonInvitatiEvento=[];
        $scope.invitiId=[];
        //console.log($scope.inviti);

        $scope.inviti.$loaded().then(function () {
            var inviti = $scope.inviti;
            for(var keySingleInvito in inviti) {
                if (inviti[keySingleInvito].eventoId == $scope.dati.evento.$id) {
                    var p=Evento.getUserInfo(inviti[keySingleInvito].invitatoId)
                    $scope.invitatiEvento.push({persona:p,invito_id: inviti[keySingleInvito].$id, invitante_id:inviti[keySingleInvito].invitanteId});
                    console.log($scope.invitatiEvento);
                }
            }
            var utenti = $scope.listaUtenti;
            for(var keySingleUser in utenti) {
                var c = 0;
                // console.log(utenti[keySingleUser].$id);
                for (var invitati in inviti) {
                    //console.log( inviti[invitati].invitatoId);
                    if (inviti[invitati].eventoId == $scope.dati.evento.$id) {
                        if (utenti[keySingleUser].$id == inviti[invitati].invitatoId)
                            c = c + 1;
                    }
                }
                //console.log(c);
                if (c === 0) {
                    //console.log(utenti[keySingleUser].$id);
                    var p2 = Evento.getUserInfo(utenti[keySingleUser].$id);
                    $scope.nonInvitatiEvento.push(p2);
                   // console.log($scope.nonInvitatiEvento);
                }
            }

        });

        //invita
        $scope.Invita = function(invitatoId) {
            Evento.insertNewInvito($scope.dati.evento.$id,invitatoId,$scope.dati.userId ,'Bottone disabilitato').then(function (ref) {
                var invitoId = ref.key;
                Evento.updateInvito(invitoId);
                $window.location.reload();
            });
        };

        //rimozione invito
        $scope.removeInvito = function (invitoId) {
            console.log(invitoId);
            Evento.deleteInvito(invitoId);
            $window.location.reload();
        };


       // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNCEGiw6oGAE68EpQTMrInl9t4bnkzoc4";

        //$scope.dati.evento.$loaded().then(function () {
            //console.log($scope.dati.evento);
          //  $scope.address = $scope.dati.evento.Indirizzo;
            // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
           // address = address || 'Ferrol, Galicia, Spain';
            // Initialize the Geocoder
           // $scope.geocoder = new google.map.Geocoder();
           // if ($scope.geocoder) {
           //     $scope.geocoder.geocode({
           //         'address': $scope.address
           //     },
           //         $scope.cambia=function (results, status) {
           //         if (status === google.map.GeocoderStatus.OK) {
           //             $scope.dati.position = {lat: results.geometry.location.lat() , lng: results.geometry.location.lng()};
           //         }
           //     });
           // }
           // $scope.dati.evm.position.push({Indirizzo: $scope.dati.position});
            //console.log($scope.address);
        //});


    }]);