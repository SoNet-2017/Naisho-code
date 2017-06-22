'use strict';

angular.module('myApp.addForumView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addForumView', {
            templateUrl: 'addForumView/addForumView.html',
            controller: 'addForumViewCtrl',
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

    .controller('addForumViewCtrl', ['$scope', '$rootScope', 'InsertForumService', '$firebaseStorage',
        function($scope, $rootScope, InsertForumService, $firebaseStorage) {
            //initialize variables
            $scope.dati = {};
            //set the variable that is used in the main template to show the active button
            //$rootScope.dati.currentView = "addPizza";
            $scope.dati.feedback = "";
            var ctrl = this;

            //define the function that will actually create a new record in the database
            $scope.addForum = function() {
                //check if the user inserted all the required information
                if ($scope.dati.titolo!= undefined && $scope.dati.titolo!="" && $scope.dati.argomento!= undefined && $scope.dati.argomento!="" ) {
                    $scope.dati.error = "";

                    $scope.finalForumAddition();

                }
                else
                {
                    //write an error message to the user
                    $scope.dati.error = "Hai dimenticato di inserire informazioni importanti!";
                }
            };

            $scope.finalForumAddition = function()
            {
                InsertForumService.insertNewForum( $scope.dati.titolo, $scope.dati.argomento).then(function(ref) {
                    var forumId = ref.key;

                    InsertForumService.updateForum(forumId);
                    $scope.dati.feedback = "Congratulazioni, hai creato un forum";
                    $scope.dati.titolo = "";
                    $scope.dati.argomento = "";

                });
            }
        }]);