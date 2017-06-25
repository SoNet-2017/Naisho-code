'use strict';

angular.module('myApp.changeImageView', ['ngRoute','myApp.users'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/changeImg', {
    templateUrl: 'changeImageView/changeImageView.html',
    controller: 'changeImageViewCtrl',
      resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $routeChangeError (see above)
              return Auth.$requireSignIn();
          }]

      }
  });
}])

.controller('changeImageViewCtrl', ['$scope', '$rootScope', 'Users', '$firebaseStorage','EditProfileService',
    function($scope, $rootScope, Users, $firebaseStorage,  EditProfileService) {
    $scope.dati = {};
    $scope.dati.feedback = "";
    $scope.dati.userId = firebase.auth().currentUser.uid;
    var ctrl = this;
    $scope.fileToUpload = null;
    $scope.imgPath= "";

    console.log(firebase.auth().currentUser.uid);

        $scope.changeImg = function() {
                //try to upload the image: if no image was specified, we create a new pizza without an image
                if ($scope.fileToUpload != null) {
                    //get the name of the file
                    var fileName = $scope.fileToUpload.name;
                    //specify the path in which the file should be saved on firebase
                    var storageRef = firebase.storage().ref("usersImg/" + fileName);
                    $scope.storage = $firebaseStorage(storageRef);
                    var uploadTask = $scope.storage.$put($scope.fileToUpload);
                    uploadTask.$complete(function (snapshot) {
                        $scope.imgPath = snapshot.downloadURL;
                        $scope.finalChange();
                    });
                    uploadTask.$error(function (error) {
                        $scope.dati.error = error + " Non hai inserito alcuna immagine";
                        //edit profile in any case (without the image)
                        $scope.finalChange();
                    });
                }
                else
            {
                //write an error message to the user
                $scope.dati.error = "Non hai inserito alcuna immagine!";
            }
        };


    ctrl.onChange = function onChange(fileList) {
        $scope.fileToUpload = fileList[0];
    };

    $scope.finalChange = function()
    {
        EditProfileService.cambiaImg( $scope.dati.userId, $scope.imgPath).then(function() {

            Users.updateUser($scope.dati.userId);

            $scope.dati.feedback = "L'immagine è stata caricata corretamente";
            $scope.imgPath="";
        });
    }
}]);
