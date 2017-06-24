'use strict'

angular.module('myApp.users.usersTutorsService', [])

    .factory('UsersTutorsService', function usersTutorService($firebaseArray, $firebaseObject) {
        var UsersTutorsService = {
            getTutors: function() {
                var ref = firebase.database().ref().child("tutors");
                return $firebaseArray(ref);
            },

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            },
            insertNewUsersTutored: function (tutor, tutored, button) {
                // quando faccio richiesta per essere tutor io sono tutor e otherUser è tutored,
                //quando faccio richiesta per avere un tutor io sono tutored e l'altro è tutor
                var ref = firebase.database().ref().child("tutors");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    tutor: tutor,
                    tutored: tutored,
                    button: button
                });
            },
            updateUsersTutored: function (tutorId) {
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
        return UsersTutorService;
    });

