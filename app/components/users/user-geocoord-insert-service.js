'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.users.usersGeocoordInsertService', [])

    .factory('InsertGeocoordService',
        function($firebaseArray) {
        var coordinate = {
            insertNewcoordinate: function (address, userId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("users").child(userId);//.child(userId);
                // create a synchronized array
                ref.update({
                    address: address
                });
            //},
            //updatecoordinate: function (userId) {
                //add the user to list of users and set the logged value to true
              //  var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                //ref.update({
                  //  id: userId
                //});
            }
        };
        return coordinate;
    });
