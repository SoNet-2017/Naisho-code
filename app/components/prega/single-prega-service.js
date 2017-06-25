'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myApp.prega.singlePregaService', [])

    .factory('SinglePrega', function($firebaseObject) {
        var singlePregaService = {
            getSinglePrega: function (preghieraId) {
                var ref = firebase.database().ref().child("preghiere").child(preghieraId);
                console.log(ref);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singlePregaService;
    });
