'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.evento.insertEventoService', [])

    .factory('InsertEventoService', function($firebaseArray) {
        var InsertEventoService = {
            insertNewEvento: function (id, titolo, descrizione, citta,indirizzo, giorno,mese,ora) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    ID: id,
                    Titolo: titolo,
                    Descrizione: descrizione,
                    Citta: citta,
                    Indirizzo: indirizzo,
                    Giorno: giorno,
                    Mese:mese,
                    Ora:ora
                });
            },
            updateEvento: function (eventoId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi").child(eventoID);
                // create a synchronized array
                ref.update({
                    "id": eventoID
                });
            }
        };
        return InsertEventoService;
    });
