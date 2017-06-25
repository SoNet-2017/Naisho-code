'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the pizzas
angular.module('myApp.prega', [
    'myApp.prega.pregaService',
    'myApp.prega.singlePregaService',
    'myApp.prega.insertPregaService'
])

.value('version', '0.1');
