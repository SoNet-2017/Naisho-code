'use strict';

angular.module('myApp.calendarView', ['ngRoute','daypilot','myApp.evento','myApp.forum'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/calendar/', {
            templateUrl: 'calendarView/calendarView.html',
            controller: 'calendarViewCtrl',
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
    .controller('calendarViewCtrl', ['$scope', '$rootScope', '$routeParams', 'currentAuth','Evento','Forum',
        function($scope, $rootScope, $routeParams, currentAuth,Evento,Forum){
        //eventi da mettere sul calendario
            $scope.events=[];
            $scope.dati={};
        //per i forum
            $scope.dati.forum=Forum.getData();
        // per scegliere come data di partenza la data odierna
            var dato = new Date();
            var a =dato.getDate();
            if (String(a).length == 1) {
                a = "0"+a;
            }
            //console.log(a);
            var b=dato.getMonth();
            b=b+1;
            if (String(b).length == 1) {
                b = "0"+b;
            }
            var data= dato.getFullYear()+"-"+b+"-"+a;
           // console.log(data);

            var dp=document.getElementById("dp");
            console.log(dp);
             $scope.config = {
                startDate: data,
                viewType: "Week",
                scrollToHour: 10,
           };

            $scope.eventi = Evento.getData();
            console.log( $scope.eventi);

            $scope.eventi.$loaded().then(function (){
                for (var i=0;i< $scope.eventi.length; i++){
                    console.log(($scope.eventi[i].start));
                  var s=$scope.eventi[i].start+"T00:00:00";
                  var f=$scope.eventi[i].end+"T00:00:00";
                  var e = new DayPilot.Event({
                          start:s,
                          end:f,
                          id: DayPilot.guid(),
                          text: $scope.eventi[i].title,
                          resource:'E'
                   });
                    console.log(e);
                    $scope.events.push(e);
                   console.log($scope.events);
                }
            });


    }]);
