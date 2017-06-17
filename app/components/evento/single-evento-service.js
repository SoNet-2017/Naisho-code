'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myApp.evento.singleEventoService', [])

    .factory('SingleEvento', function($firebaseObject) {
        var singleEventoService = {
            getSingleEvento: function (eventoId) {
                var ref = firebase.database().ref().child("eventi").child(eventoId);
                console.log(ref);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singleEventoService;
    });
