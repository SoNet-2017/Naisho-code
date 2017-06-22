'use strict';

angular.module('myApp.addEventoView', ['ngRoute','myApp.evento'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addEvento', {
            templateUrl: 'addEventoView/addEventoView.html',
            controller: 'addEventoViewCtrl',
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

    .controller('addEventoViewCtrl', ['$scope', '$rootScope', 'InsertEventoService', '$firebaseStorage',
        function($scope, $rootScope, InsertEventoService, $firebaseStorage) {
            //initialize variables
            $scope.dati = {};



            //set the variable that is used in the main template to show the active button
            //$rootScope.dati.currentView = "addPizza";
            $scope.dati.feedback = "";
            var ctrl = this;

            //define the function that will actually create a new record in the database
            $scope.addEvento = function() {
                //check if the user inserted all the required information
                if ($scope.dati.indirizzo!= undefined && $scope.dati.indirizzo!="" && $scope.dati.titolo!= undefined && $scope.dati.titolo!="" && $scope.dati.descrizione!=undefined && $scope.dati.descrizione!=""
                    && $scope.dati.citta!=undefined && $scope.dati.citta!="" && $scope.dati.ora!=undefined && $scope.dati.ora!="") {
                    $scope.dati.error = "";

                    $scope.finalEventoAddition();

                }
                else
                {
                    //write an error message to the user
                    $scope.dati.error = "Hai dimenticato di inserire informazioni importanti!";
                }
            };


            console.log($scope.dati.data);
            $scope.finalEventoAddition = function()
            {
                var mese=new Date(document.getElementById('txtData').value).getMonth();
                mese=mese+1;
                if (String(mese).length == 1) {
                    mese = "0"+mese;
                }
                var giorno=new Date(document.getElementById('txtData').value).getDate();
                if (String(giorno).length == 1) {
                    giorno = "0"+giorno;
                }
                var anno=new Date(document.getElementById('txtData').value).getFullYear();
                var date=anno+"-"+mese+"-"+giorno;
                    console.log(mese);
                console.log(giorno);
                console.log(date);
                InsertEventoService.insertNewEvento( $scope.dati.titolo, $scope.dati.descrizione, $scope.dati.citta,$scope.dati.indirizzo, giorno, mese, $scope.dati.ora, date).then(function(ref) {
                    var eventoId = ref.key;

                    InsertEventoService.updateEvento(eventoId);
                    $scope.dati.feedback = "Congratulazioni, hai creato un evento";
                    $scope.dati.indirizzo = "";
                    $scope.dati.titolo = "";
                    $scope.dati.descrizione = "";
                    $scope.dati.ora = "";
                    $scope.dati.citta = "";
                    $scope.dati.data = "";
                });
            }
        }]);