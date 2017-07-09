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
    .controller('searchViewCtrl', ['$scope','$routeParams', 'Forum', 'Post', 'UserList', 'Evento','currentAuth','$window',
        function($scope, $routeParams, Forum, Post, UserList, Evento, currentAuth,$window) {


            //initialize variables
            $scope.dati = {};
            $scope.risultato={};
            $scope.risultati=[];
            $scope.nome = {};
            $scope.cognome = {};

            $scope.myID=currentAuth.uid;

            $scope.dati.evento = Evento.getData();
            //console.log( $scope.dati.evento );
            $scope.dati.forum = Forum.getData();
            //console.log($scope.dati.forum);
            $scope.dati.posts = Post.getData();
            //console.log( $scope.dati.posts );
            $scope.dati.listaUtenti = UserList.getListOfUsers();
            //console.log( $scope.dati.listaUtenti );
            $scope.fine=false;

            $scope.ricarica=function(){
                $window.location.reload();
            }

            $scope.dati.listaUtenti.$loaded().then(function () {
                $scope.dati.posts.$loaded().then(function () {
                $scope.cerca = function () {
                    $scope.dati.ricerca=$scope.dati.ricercaa.toLowerCase().split(" "); // ho dovuto fare cosi perchè altrimenti non si prende lo split
                    console.log($scope.dati.ricerca);
                    for (var i = 0; i < $scope.dati.listaUtenti.length; i++) {
                        $scope.nome = $scope.dati.listaUtenti[i].name.toLowerCase().split(" ");
                        console.log($scope.nome);
                        $scope.cognome = $scope.dati.listaUtenti[i].surname.toLowerCase().split(" ");
                        console.log($scope.cognome);
                        console.log($scope.nome, $scope.cognome);
                        for (var c = 0; c < $scope.dati.ricerca.length;  c++) {
                            if (((String($scope.dati.ricerca[c]) === String($scope.nome)) ||
                                (String($scope.dati.ricerca[c]) === String($scope.cognome)) ||
                                (String($scope.dati.ricerca[c]) === String($scope.dati.listaUtenti[i].email))) //c'è da vedere questo perchè con l'and se non pubblicano neanche un post allora non li trovi
                                ) {
                                var risultato = $scope.dati.listaUtenti[i].name + ' ' +$scope.dati.listaUtenti[i].surname + ' ' +  $scope.dati.listaUtenti[i].email;
                                var id=$scope.dati.listaUtenti[i].$id;
                                console.log( "cosa salva come risultato di ricerca:",risultato, id);
                                $scope.risultati.push({risultato:risultato, id:id});

                            }
                            //else {$scope.risultato=" ";}

                        }
                        //console.log("$scope.dati.listaUtenti.length", $scope.dati.listaUtenti.length);
                        //console.log("numeri effettivi di cicli", i);
                    }
                    console.log($scope.dati.ricerca);
                    console.log($scope.risultato);



                    //return $scope.risultato;
        }
                if ($scope.risultati.length<=0) $scope.fine=true;
                }
                )}
                );

            //Azzero le variabili di ricerca
            //$scope.risultato={};
            //$scope.nome={};
            //$scope.cognome={};


           //$scope.risultati=function(){
               // document.getElementById("contenitore").innerHTML = $scope.risultato;
           // };
                }]);
