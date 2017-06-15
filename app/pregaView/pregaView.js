'use strict';

angular.module('myApp.pregaView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/pregaView/', {
            templateUrl: 'pregaView/pregaView.html',
            controller: 'pregaViewCtrl',
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
    .controller('pregaViewCtrl', ['$scope',
        function($scope){
            //initialize variables
           // $scope.dati = {};

            /*cronometro*/
            var centesimi = 0;
            var secondi = 0;
            var minuti = 0;
            var ore = 0;


            document.getElementById("Centesimi").innerHTML = ":00";
            document.getElementById("Secondi").innerHTML = ":00";
            document.getElementById("Minuti").innerHTML = ":00";
            document.getElementById("Ore").innerHTML = "00";
            $scope.cronometro =function() {
                if (centesimi < 99) {
                    centesimi++;
                    if (centesimi< 10) { centesimi = "0"+centesimi; }
                    document.getElementById("Centesimi").innerHTML = ":"+centesimi;
                }
                if (centesimi === 99) {
                    centesimi = 0;
                }
                if (centesimi === 0) {
                    secondi ++;
                    if (secondi < 10) { secondi = "0"+secondi;}
                    document.getElementById("Secondi").innerHTML = ":"+secondi;
                }
                if (secondi === 59) {
                    secondi= 0;

                if ( (centesimi === 0)&&(secondi=== 0) ) {
                    minuti++;
                    if (minuti < 10) { minuti = "0"+minuti; }
                    document.getElementById("Minuti").innerHTML = ":"+minuti;
                }}
                if (minuti === 59) {
                    minuti = -1;
                }
                if ( (centesimi=== 0)&&(secondi === 0)&&(minuti === 0) ) {
                    ore ++;
                    if (ore < 10) { ore = "0"+ore}
                    document.getElementById("Ore").innerHTML = ore;
                }
            }
            $scope.start =function  () {
                $scope.control = setInterval($scope.cronometro,10);
                document.getElementById("Iniziare").disabled = true;

    document.getElementById("Fermarsi").disabled = false;
    document.getElementById("Continuare").disabled = true;
    document.getElementById("Ripartire").disabled = false;

};



            $scope.stop =function() {
    clearInterval($scope.control);
    document.getElementById("Fermarsi").disabled = true;
    document.getElementById("Continuare").disabled = false;
};

            $scope.reset =function() {
    clearInterval($scope.control);
    clearInterval($scope.cronometro);
    var centesimi = 0;
    var secondi= 0;
    var minuti= 0;
    var ore = 0;
    document.getElementById("Centesimi").innerHTML = ":00";
    document.getElementById("Secondi").innerHTML = ":00";
    document.getElementById("Minuti").innerHTML = ":00";
    document.getElementById("Ore").innerHTML = "00";
    document.getElementById("Iniziare").disabled = false;
    document.getElementById("Fermarsi").disabled = true;
    document.getElementById("Continuare").disabled = true;
    document.getElementById("Ripartire").disabled = true;
};

            var status = 0;
            $scope.Play=function(id) {
                var audio = $("#"+id);
                if(status === 0 || status === 2)
                {
                    if(status === 0) audio.attr("src=../Audio/suonogong.mp3");
                    audio[0].play();
                    $("#play").attr("class","glyphicon glyphicon-pause aligned")
                    status = 1;
                } else if(status === 1) {
                    audio[0].pause();
                    $("#play").attr("class","glyphicon glyphicon-play aligned")
                    status = 2;
                }
            };

    }]);