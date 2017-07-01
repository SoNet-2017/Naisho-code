'use strict';

angular.module('myApp.tutorView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/tutor/', {
            templateUrl: 'tutorView/tutorView.html',
            controller: 'tutorViewCtrl',
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
    .controller('tutorViewCtrl', ['$scope', '$rootScope', '$routeParams', 'currentAuth','UsersTutorsService','UsersFriends',
        function($scope, $rootScope, $routeParams, currentAuth,UsersTutorsService,UsersFriends){
            //initialize variables
            $scope.dati = {};
            $scope.amiciView=[];
            $scope.tutorsView=[];
            $scope.tutoredView=[];

            //dati current user
            $scope.dati.userId = UsersFriends.getUserInfo(currentAuth.uid);

            // dati su tutte amicizie
            $scope.dati.friends = UsersFriends.getFriends();
            //console.log( $scope.dati.friends);
            // dati su tutti i tutor
            $scope.dati.tutors = UsersTutorsService.getTutors();
            //console.log( $scope.dati.tutors);

            $scope.dati.friends.$loaded().then(function(){
                var friends = $scope.dati.friends;
                for (var keySingleFriend in friends) {
                    if (!angular.isFunction(keySingleFriend)) {
                        if (!angular.isFunction(friends[keySingleFriend]))
                        {
                            if (friends[keySingleFriend]!=undefined && friends[keySingleFriend].friend1!=undefined && friends[keySingleFriend].friend2!=undefined) {
                                if ($scope.dati.userId.$id == friends[keySingleFriend].friend1){
                                    var persona=UsersFriends.getUserInfo(friends[keySingleFriend].friend2);
                                    console.log(persona);
                                    $scope.amiciView.push(persona);
                                }
                                else if( $scope.dati.userId.$id == friends[keySingleFriend].friend2){
                                    var persona=UsersFriends.getUserInfo(friends[keySingleFriend].friend1);
                                    //console.log(persona);
                                    $scope.amiciView.push(persona);
                                }
                            }
                        }
                    }
                }
            });

            $scope.dati.tutors.$loaded().then(function(){
                var tutors = $scope.dati.tutors;
                for (var keySingleTutor in tutors) {
                    if (!angular.isFunction(keySingleTutor)) {
                        if (!angular.isFunction(tutors[keySingleTutor]))
                        {
                            if (tutors[keySingleTutor]!=undefined && tutors[keySingleTutor].tutor!=undefined  && tutors[keySingleTutor].tutored!=undefined) {
                                if ($scope.dati.userId.$id == tutors[keySingleTutor].tutor){
                                    var persona=UsersFriends.getUserInfo(tutors[keySingleTutor].tutored);
                                   // console.log(persona);
                                    $scope.tutoredView.push(persona);
                                    //$scope.tutored.push(tutors[keySingleTutor].tutored);
                                    //console.log( $scope.tutored);
                                }
                                else if( $scope.dati.userId.$id == tutors[keySingleTutor].tutored){
                                    var persona=UsersFriends.getUserInfo(tutors[keySingleTutor].tutor);
                                    //console.log(persona);
                                    $scope.tutorsView.push(persona);
                                    //$scope.tutors.push(tutors[keySingleTutor].tutor);
                                    //console.log( $scope.tutors);
                                }
                            }
                        }
                    }
                }
            });


        }]);
