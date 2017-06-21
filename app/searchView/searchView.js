'use strict';

angular.module('myApp.searchView', ['ngRoute','myApp.forum','myApp.post','myApp.users','myApp.evento'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/searchView/', {
            templateUrl: 'searchView/searchView.html',
            controller: 'searchViewCtrl',
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
    //Inline Array Annotation
    //Here we pass an array whose elements consist of a list of strings (the names of the dependencies)
    // followed by the function itself.
    //When using this type of annotation, take care to keep the annotation array
    // in sync with the parameters in the function declaration.
    .controller('searchViewCtrl', ['$scope','$routeParams', 'Forum', 'Post', 'UserList', 'Evento',
        function($scope, $routeParams, Forum, Post, UserList, Evento ) {
            //initialize variables
            $scope.dati = {};

            $scope.dati.forum = Forum.getData();
            console.log($scope.dati.forum);
           $scope.dati.posts = Post.getData();
           console.log( $scope.dati.posts );
            $scope.dati.listaUtenti = UserList.getListOfUsers();
            console.log( $scope.dati.listaUtenti );
           $scope.dati.evento = Evento.getData();
           console.log( $scope.dati.listaUtenti );
        }]);