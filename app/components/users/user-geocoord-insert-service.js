'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.users.usersGeocoordInsertService', [])

    .factory('InsertGeocoordService', function($firebaseArray) {
        var coordinate = {
            insertNewcoordinate: function (address) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("users");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    address: address
                });
            },
            updatecoordinate: function ($firebaseUser) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("users").child($firebaseUser.uid);
                // create a synchronized array
                ref.update({
                    id: $firebaseUser.uid
                });
            }
        };
        return NewPizzaService;
    });
