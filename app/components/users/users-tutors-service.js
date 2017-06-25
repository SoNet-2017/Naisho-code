'use strict'

angular.module('myApp.users.usersTutorsService', [])

    .factory('UsersTutorsService', function usersTutorService($firebaseArray, $firebaseObject) {
        var NewUsersTutorService = {
            getTutors: function() {
                var ref = firebase.database().ref().child("tutors");
                return $firebaseArray(ref);
            },

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            },
            insertNewTutor: function (tutor, tutored,  button) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("tutors");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    tutor: tutor,
                    tutored: tutored,
                    button: button
                });
            },
            updateUsersTutor: function (tutorId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("tutors").child(tutorId);
                // create a synchronized array
                ref.update({
                    id: tutorId
                });
            },
            deleteTutor: function (tutorId) {
                var refDel = firebase.database().ref().child("tutors").child(tutorId);
                refDel.remove();
            }
        };
        return NewUsersTutorService;
    });