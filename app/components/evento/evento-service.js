'use strict';

//The service implemented in this module will get information about all the available eventi
angular.module('myApp.evento.eventoService', [])

    .factory('Evento', function($firebaseArray,$firebaseObject) {
        var eventoService = {
            getData: function () {
                var ref = firebase.database().ref().child("eventi");
                // download the data into a local object
                return $firebaseArray(ref);

            },
            getListOfUsers: function () {
                //get the list of users
                var ref = firebase.database().ref().child("users");
                // download the data into a local object
                return $firebaseArray(ref);
            },
            getInviti: function () {
                var ref = firebase.database().ref().child("inviti");
                // download the data into a local object
                return $firebaseArray(ref);

            },
            insertNewInvito: function (eventoId, invitatoId,invitante, bottone) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("inviti");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    eventoId: eventoId,
                    invitatoId: invitatoId,
                    invitanteId: invitante,
                    invitato:true,
                    Bottone: bottone,

                });
            },
            updateInvito: function (invitoId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("inviti").child(invitoId);
                // create a synchronized array
                ref.update({
                    "id": invitoId
                });
            },
            deleteInvito: function (invitoId) {
                var refDel = firebase.database().ref().child("inviti").child(invitoId);
                refDel.remove();
            },

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            }

        };
        return eventoService;
    });
