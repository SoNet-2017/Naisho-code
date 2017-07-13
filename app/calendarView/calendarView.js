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
    .controller('calendarViewCtrl', ['$scope', '$rootScope', '$routeParams', 'currentAuth','Evento','Forum','SingleEvento',
        function($scope, $rootScope, $routeParams, currentAuth,Evento,Forum,SingleEvento){

        // eventi a cui sono invitato
            $scope.invitato=[];

            $scope.dati={};
        //per i forum
            $scope.dati.forum=Forum.getData();
            //id mio
            var id = currentAuth.uid;
            console.log(id);
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

            //configurazione calendario dayPilot

            var dp = new DayPilot.Calendar("dp");
            dp.viewType='Week';
            dp.scrollToHour= 10;
            dp.startDate = DayPilot.Date(data);
            //console.log(dp.startDate);


            $scope.eventi = Evento.getData();
           // console.log( $scope.eventi);
            dp.init();
            //per ogni evento del database, creo un oggetto dayPilot.Event e lo metto nel'array "events"che viene passato al calendario
            $scope.eventi.$loaded().then(function (){
                for (var i=0;i< $scope.eventi.length; i++){
                    //console.log($scope.eventi[i]);
                    //console.log($scope.eventi[i].start);
                    var s=$scope.eventi[i].start+"T"+$scope.eventi[i].Ora+":00";
                    var e = new DayPilot.Event({
                        start: new DayPilot.Date(s),
                        end: new DayPilot.Date(s).addHours(5),
                        id: DayPilot.guid(),
                        text: $scope.eventi[i].title,
                         });

                    //console.log(e);
                   // $scope.events.push(e);
                    dp.events.add(e);
                    //console.log(dp.events);
                }
          });

            $scope.dati.inviti = Evento.getInviti();
            console.log( $scope.dati.inviti );
            $scope.dati.inviti.$loaded().then(function (){
                for (var i=0;i< $scope.dati.inviti.length; i++){
                if($scope.dati.inviti[i].invitatoId==id){
                    var evento=SingleEvento.getSingleEvento($scope.dati.inviti[i].eventoId);
                    $scope.invitato.push(evento);
                     }
                }
            });

        }]);
