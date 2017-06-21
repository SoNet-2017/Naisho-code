'use strict';

angular.module('myApp.calendarView', ['ngRoute','daypilot','myApp.evento'])

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
    .controller('calendarViewCtrl', ['$scope', '$rootScope', '$routeParams', 'currentAuth','Evento',
        function($scope, $rootScope, $routeParams, currentAuth,Evento){

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
            console.log(data);

        $scope.config = {
                startDate: data,
                viewType: "Week"
            };
            $scope.events = Evento.getData();
            console.log( $scope.events);



            $scope.add = function() {
                $scope.events.push(
                    {
                        start: new DayPilot.Date("2014-09-01T10:00:00"),
                        end: new DayPilot.Date("2014-09-01T12:00:00"),
                        id: DayPilot.guid(),
                        text: "Simple Event"
                    }
                );
            };

            $scope.move = function() {
                var event = $scope.events[0];
                event.start = event.start.addDays(1);
                event.end = event.end.addDays(1);
            };

            $scope.rename = function() {
                $scope.events[0].text = "New name";
            };

            $scope.message = function() {
                $scope.dp.message("Hi");
            };

    }]);