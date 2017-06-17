/**
 * Created by Sele on 14/06/2017.
 */
'use strict';

angular.module('myApp.users.EditProfileService', [])

    .factory('EditProfileService', function($firebaseArray,$firebaseObject) {
        var user = firebase.auth().currentUser;
        var EditProfileService = {
            editProfile: function (userId,name,surname,DataDiNascita, password,nuovapassword,nuovapassword2,buddista,tutor,imgPath) {
               if(nuovapassword===nuovapassword2 && nuovapassword!="")
                var ref = firebase.database().ref().child("users").child(user);
                // create a synchronized array
                ref.update({
                    name:name,
                    surname:surname,
                    buddista: buddista,
                });
                user.updatePassword(nuovapassword).then(function() {
                    // Update successful.
                });
                ref.set({
                    tutor:tutor,
                    img_url: imgPath,
                });
            }
        };
        return EditProfileService;
    });