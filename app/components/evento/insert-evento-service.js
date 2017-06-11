'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.evento.insertEventoService', [])

    .factory('InsertEventoService', function($firebaseArray) {
        var NewEventoService = {
            insertNewEvento: function (id, titolo, descrizione, citta,indirizzo) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    ID: id,
                    titolo: titolo,
                    descrizione: descrizione,
                    citta: citta,
                    indirizzo: indirizzo
                });
            },
            updateEvento: function (eventoId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi").child(eventoId);
                // create a synchronized array
                ref.update({
                    id: eventoId
                });
            }
        };
        return NewEventoService;
    });
