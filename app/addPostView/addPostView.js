'use strict';

angular.module('myApp.addPostView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addPost', {
            templateUrl: 'addPostView/addPostView.html',
            controller: 'addPostViewCtrl',
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

    .controller('addPostViewCtrl', ['$scope', '$rootScope', 'InsertPostService', '$firebaseStorage',
        function($scope, $rootScope, InsertPostService, $firebaseStorage) {
            //initialize variables
            $scope.dati = {};
            //set the variable that is used in the main template to show the active button
            //$rootScope.dati.currentView = "addPizza";
            $scope.dati.feedback = "";
            var ctrl = this;

            //define the function that will actually create a new record in the database
            $scope.addEvento = function() {
                //check if the user inserted all the required information
                if ($scope.dati.contenuto!= undefined && $scope.dati.contenuto!="" ) {
                    $scope.dati.error = "";

                    $scope.finalPostAddition();

                }
                else
                {
                    //write an error message to the user
                    $scope.dati.error = "Non hai inserito nessun contenuto da condividere!";
                }
            };
            //initialize the function that will be called when a new file will be specified by the user
           // ctrl.onChange = function onChange(fileList) {
             //   $scope.fileToUpload = fileList[0];
            //};
            //function that will create the new record  in the Firebase storage
           // var mese=$scope.dati.data.getMonth();
            //mese=mese+1;

           // var giorno=$scope.dati.data.getDay();
            console.log($scope.dati.data);
            $scope.finalPostAddition = function()
            {
                InsertPostService.insertNewPost(  $scope.dati.contenuto).then(function(ref) {
                    var eventoId = ref.key;

                    InsertEventoService.updateEvento(eventoId);
                    $scope.dati.feedback = "Il post è stato condiviso";
                    $scope.dati.contenuto = "";

                });
            }
        }]);