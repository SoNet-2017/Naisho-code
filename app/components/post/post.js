'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the pizzas
angular.module('myApp.post', [
    'myApp.post.postService',
    'myApp.post.singlePostService',
    'myApp.post.insertPostService',
    ])

.value('version', '0.1');
