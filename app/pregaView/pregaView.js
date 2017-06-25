'use strict';

angular.module('myApp.pregaView', ['ngRoute','myApp.users','myApp.prega','myApp.post'])

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
    .controller('pregaViewCtrl', ['$scope','Users','InsertPregaService','InsertPostService',
        function($scope, Users,InsertPregaService,InsertPostService){
            //initialize variables
            $scope.dati.feedback = "";
           // id user attuale
            $scope.userId = firebase.auth().currentUser.uid;
            console.log($scope.userId );
            /*cronometro*/
            var centesimi = 0;
            var secondi = 0;
            var minuti = 0;
            var ore = 0;


            document.getElementById("Centesimi").innerHTML = ":00";
            document.getElementById("Secondi").innerHTML = ":00";
            document.getElementById("Minuti").innerHTML = ":00";
            document.getElementById("Ore").innerHTML = "00";

            //data:
            var mese=new Date().getMonth();
            mese=mese+1;
            if (String(mese).length == 1) {
                mese = "0"+mese;
            }
            var giorno=new Date().getDate();
            if (String(giorno).length == 1) {
                giorno = "0"+giorno;
            }
            var anno=new Date().getFullYear();
            var data=anno+"-"+mese+"-"+giorno;

            console.log(data);


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
// suono GONG
            var status = 0;
            $scope.Play=function(id) {
                var audio = $("#"+id);
                if(status === 0 || status === 2)
                {
                    if(status === 0)  {audio.attr("src=../Audio/suonogong.mp3");
                    }
                    audio[0].play();
                    $("#play").attr("class","glyphicon glyphicon-pause aligned")
                    status = 1;
                } else if(status === 1) {
                    audio[0].pause();
                    $("#play").attr("class","glyphicon glyphicon-play aligned")
                    status = 2;
                }

            };


        $scope.salva= function(){

            var durata=ore+":"+minuti+":"+secondi;
            console.log(durata);
            InsertPregaService.insertNewPreghiera( $scope.userId, data, durata).then(function(ref) {
                var preghieraId = ref.key;

                InsertPregaService.updatePreghiera(preghieraId);
                $scope.dati.feedback = "La preghiera è stata salvata";
            });
        }

            $scope.pubblica= function(){

                var durata=ore+":"+minuti+":"+secondi;
                var contenuto="Ho appena praticato"+" "+durata;
                console.log(contenuto);
                InsertPostService.insertNewPost(contenuto,$scope.userId).then(function(ref) {
                    var postId = ref.key;

                    InsertPostService.updatePost(postId);
                    $scope.dati.feedback = "Il post è stato condiviso";
                });
            }

    }]);