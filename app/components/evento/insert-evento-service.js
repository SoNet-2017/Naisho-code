'use strict';


angular.module('myApp.evento.insertEventoService', [])

    .factory('InsertEventoService', function($firebaseArray) {
        var InsertEventoService = {
            insertNewEvento: function (titolo, descrizione, citta,indirizzo, giorno,mese,ora,data) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    title: titolo,
                    Descrizione: descrizione,
                    Citta: citta,
                    Indirizzo: indirizzo,
                    Giorno: giorno,
                    Mese:mese,
                    Ora:ora,
                    start:data,
                    end:data
                });
            },
            updateEvento: function (eventoId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi").child(eventoId);
                // create a synchronized array
                ref.update({
                    "id": eventoId
                });
            }
        };
        return InsertEventoService;
    });
