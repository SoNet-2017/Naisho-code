'use strict';

angular.module('myApp.addEventoView', ['ngRoute'])

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
            //initialize the function that will be called when a new file will be specified by the user
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };
            //function that will create the new record  in the Firebase storage
            $scope.finalEventoAddition = function()
            {
                InsertEventoService.insertNewEvento($scope.dati.indirizzo, $scope.dati.titolo, $scope.dati.descrizione, $scope.dati.ora, $scope.dati.citta, $scope.dati.data).then(function(ref) {
                    var eventoId = ref.key;
                    InsertPizzaService.updateEvento(eventoId);
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