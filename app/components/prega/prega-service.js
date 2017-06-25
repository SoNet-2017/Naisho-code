'use strict';

//The service implemented in this module will get information about all the available eventi
angular.module('myApp.prega.pregaService', [])

    .factory('Prega', function($firebaseArray) {
        var pregaService = {
            getData: function () {
                var ref = firebase.database().ref().child("preghiere");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return pregaService;
    });
