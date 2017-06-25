'use strict';


angular.module('myApp.prega.insertPregaService', [])

    .factory('InsertPregaService', function($firebaseArray) {
        var InsertPregaService = {
            insertNewPreghiera: function (userId, data, durata) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("preghiere");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    userId: userId,
                    data: data,
                    durata: durata,

                });
            },
            updatePreghiera: function (preghieraId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("preghiere").child(preghieraId);
                // create a synchronized array
                ref.update({
                    "id": preghieraId
                });
            }
        };
        return InsertPregaService;
    });
