'use strict';

angular.module('myApp.searchView', ['ngRoute','myApp.forum','myApp.post','myApp.users','myApp.evento'])

   // .filter('split', function() {
     //   return function(input, splitChar, splitIndex) {
       //     // do some bounds checking here to ensure it has that index
         //   return input.split(splitChar)[splitIndex];
        //};
    //})

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
    .controller('searchViewCtrl', ['$scope','$routeParams', 'Forum', 'Post', 'UserList', 'Evento','currentAuth',
        function($scope, $routeParams, Forum, Post, UserList, Evento, currentAuth) {


            //initialize variables
            $scope.dati = {};
            $scope.risultato={};
            $scope.risultati={};
            //$scope.nome = {};
           // $scope.cognome = {};

            $scope.myID=currentAuth.uid;


            $scope.dati.forum = Forum.getData();
            console.log($scope.dati.forum);
           $scope.dati.posts = Post.getData();
           console.log( $scope.dati.posts );
            $scope.dati.listaUtenti = UserList.getListOfUsers();
            console.log( $scope.dati.listaUtenti );

            $scope.dati.listaUtenti.$loaded().then(function () {
                $scope.dati.posts.$loaded().then(function () {
                $scope.input = function () {

                    //console.log($scope.dati.ricerca);
                    //console.log("cosa sto cercando è un array di:",$scope.dati.ricerca.length);
                    $scope.dati.ricerca.split(" ");
                    for (var i = 0; i < $scope.dati.listaUtenti.length; i++) {
                        $scope.nome = $scope.dati.listaUtenti[i].name;
                        $scope.nome.split(" ");
                        $scope.cognome = $scope.dati.listaUtenti[i].surname;
                        $scope.cognome.split(" ");
                        console.log($scope.nome, $scope.cognome);
                        for (var a = 0, b = 0, c = 0,d=0;
                             a < $scope.nome.length, b < $scope.cognome.length, c < $scope.dati.ricerca.length, d < $scope.dati.posts.length;
                             a++ , b++, c++, d++) {

                            if ((($scope.dati.ricerca[c] === $scope.nome[a]) ||
                                ($scope.dati.ricerca[c] === $scope.cognome[b]) ||
                                ($scope.dati.ricerca[c] === $scope.dati.listaUtenti[i].email)) || //c'è da vedere questo perchè con l'and se non pubblicano neanche un post allora non li trovi
                                $scope.dati.posts[d].userPost===$scope.dati.listaUtenti[i].$id) {

                                $scope.risultato = $scope.dati.listaUtenti[i].name + ' ' +
                                    $scope.dati.listaUtenti[i].surname + ' ' +
                                    $scope.dati.listaUtenti[i].email;
                                $scope.dati.userpost= $scope.dati.posts[d].userPost;

                            }

                        }
                        console.log("$scope.dati.listaUtenti.length", $scope.dati.listaUtenti.length);
                        console.log("numeri effettivi di cicli", i);
                    }
                    console.log($scope.dati.ricerca);
                    console.log($scope.risultato);



                    //return $scope.risultato;
                } })});

            //Azzero le variabili di ricerca
            $scope.risultato={};
            //$scope.nome={};
            //$scope.cognome={};
           $scope.dati.evento = Evento.getData();
           console.log( $scope.dati.listaUtenti );

            $scope.risultati=function(){
                document.getElementById("contenitore").innerHTML = $scope.risultato;
            };
                }]);
