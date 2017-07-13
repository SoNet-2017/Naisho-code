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
            $scope.risultatiEventi=[];
            $scope.risultatiForum=[];
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
                $scope.dati.evento.$loaded().then(function ()     {
                        $scope.dati.forum.$loaded().then(function () {

                            $scope.cerca = function () {
                                $scope.dati.ricerca = $scope.dati.ricercaa.toLowerCase().split(" ");
                                // ho dovuto fare cosi perchè altrimenti non si prende lo split
                                console.log($scope.dati.ricerca);
                                for (var i = 0; i < $scope.dati.listaUtenti.length; i++) {
                                    $scope.nome = $scope.dati.listaUtenti[i].name.toLowerCase().split(" ");
                                    //console.log($scope.nome);
                                    $scope.cognome = $scope.dati.listaUtenti[i].surname.toLowerCase().split(" ");
                                    //console.log($scope.cognome);
                                    //console.log($scope.nome, $scope.cognome);
                                    for (var c = 0; c < $scope.dati.ricerca.length; c++) {
                                        if (String($scope.dati.ricerca[c]) === String($scope.nome) ||
                                            String($scope.dati.ricerca[c]) === String($scope.cognome) ||
                                            String($scope.dati.ricerca[c]) === String($scope.dati.listaUtenti[i].email)) {
                                            var risultato = $scope.dati.listaUtenti[i].name + ' ' + $scope.dati.listaUtenti[i].surname + ' ' + $scope.dati.listaUtenti[i].email;
                                            var id = $scope.dati.listaUtenti[i].$id;
                                            //console.log("cosa salva come risultato di ricerca:", risultato, id);
                                            $scope.risultati.push({risultato: risultato, id: id});
                                        }
                                        //else {$scope.risultato=" ";}

                                    }
                                   // console.log($scope.dati.ricerca);
                                }
                                for (var i = 0; i < $scope.dati.evento.length; i++) {
                                    $scope.titolo = $scope.dati.evento[i].title.toLowerCase().split(" ");
                                    $scope.descrizione = $scope.dati.evento[i].Descrizione.toLowerCase().split(" ");
                                    $scope.citta=$scope.dati.evento[i].Citta.toLowerCase().split(" ");
                                    //console.log($scope.titolo);
                                    //console.log($scope.dati.ricerca.length);
                                    for (var c = 0; c < $scope.dati.ricerca.length; c++) {
                                        for (var j = 0; j < $scope.titolo.length; j++) {
                                            for (var f = 0; f < $scope.descrizione.length; f++) {
                                                for (var g = 0; g < $scope.citta.length; g++) {
                                                    if (String($scope.dati.ricerca[c]) === String($scope.titolo[j]) ||
                                                        String($scope.dati.ricerca[c]) === String($scope.descrizione[f]) ||
                                                        String($scope.dati.ricerca[c]) === String($scope.citta[g])) {
                                                        var risultato = $scope.dati.evento[i].title + ' ' + $scope.dati.evento[i].Citta + ' ' + $scope.dati.evento[i].start + ' ' + $scope.dati.evento[i].Descrizione;
                                                        var id = $scope.dati.evento[i].$id;
                                                        console.log("cosa salva come risultato di ricerca:", risultato, id);
                                                        //console.log($scope.risultatiEventi.contains(id));
                                                        if (!$scope.risultatiEventi.contains(id))
                                                            $scope.risultatiEventi.push({risultato: risultato, id: id});
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                for (var i = 0; i < $scope.dati.forum.length; i++) {
                                    $scope.titolo = $scope.dati.forum[i].titolo.toLowerCase().split(" ");
                                    $scope.argomento = $scope.dati.forum[i].argomento.toLowerCase().split(" ");
                                   // console.log($scope.titolo);
                                    for (var c = 0; c < $scope.dati.ricerca.length; c++) {
                                        for (var j = 0; j < $scope.titolo.length; j++) {
                                            for (var f = 0; f < $scope.argomento.length; f++) {
                                                if (String($scope.dati.ricerca[c]) === String($scope.titolo[j]) ||
                                                    String($scope.dati.ricerca[c]) === String($scope.argomento[f])) {
                                                    var risultato = $scope.dati.forum[i].titolo;
                                                    var id = $scope.dati.forum[i].$id;
                                                    // console.log("cosa salva come risultato di ricerca:", risultato, id);
                                                    if (!$scope.risultatiForum.contains(id))
                                                    $scope.risultatiForum.push({risultato: risultato, id: id});
                                                }
                                            }
                                        }
                                    }
                                }
                                if ($scope.risultati.length<=0 && $scope.risultatiEventi.length<=0 && $scope.risultatiForum.length<=0) $scope.fine = true;
                            }
                        })
                })
            });
            Array.prototype.contains = function(elem)
            {
                for (var i in this)
                {
                    if (this[i].id == elem) return true;
                }
                return false;
            }
         }]);
