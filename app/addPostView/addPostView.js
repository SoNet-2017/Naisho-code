'use strict';

angular.module('myApp.addPostView', ['ngRoute','myApp.post'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addPost', {
            templateUrl: 'addPostView/addPostView.html',
            controller: 'addPostViewCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]
            }
        })
        
    }])

    .controller('addPostViewCtrl', ['$scope', '$rootScope', 'InsertPostService', '$firebaseStorage','$firebaseAuth',
        function($scope, $rootScope, InsertPostService, $firebaseStorage,$firebaseAuth) {
            $scope.dati = {};
            var userPost= $firebaseAuth().$getAuth().uid;
            console.log(userPost);
            $scope.dati.feedback = "";
            var ctrl = this;
            $scope.fileToUpload = null;
            $scope.imgPath= "";

            //define the function that will actually create a new record in the database
            $scope.addPost = function() {
                //check if the user inserted all the required information
                if ($scope.dati.contenuto!= undefined && $scope.dati.contenuto!="" ) {
                    $scope.dati.error = "";
                    if ($scope.fileToUpload != null) {
                        //get the name of the file
                        var fileName = $scope.fileToUpload.name;
                        //specify the path in which the file should be saved on firebase
                        var storageRef = firebase.storage().ref("postImg/" + fileName);
                        $scope.storage = $firebaseStorage(storageRef);
                        var uploadTask = $scope.storage.$put($scope.fileToUpload);
                        uploadTask.$complete(function (snapshot) {
                            $scope.imgPath = snapshot.downloadURL;
                            $scope.finalPostAddition();
                        });
                        uploadTask.$error(function (error) {
                            $scope.dati.error = error + " Non hai inserito alcuna immagine";
                            //add the pizza in any case (without the image)
                            $scope.finalPostAddition();
                        });
                    }
                    else {
                        //do not add the image
                        $scope.finalPostAddition();

                    }
                }

                else
                {
                    //write an error message to the user
                    $scope.dati.error = "Non hai inserito nessun contenuto da condividere!";
                }
            };
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };

            $scope.finalPostAddition = function()
            {
                InsertPostService.insertNewPost($scope.dati.contenuto,userPost).then(function(ref) {
                    var postId = ref.key;

                    InsertPostService.updatePost(postId);
                    $scope.dati.feedback = "Il post è stato condiviso";
                    $scope.dati.contenuto = "";

                });
            }
        }]);