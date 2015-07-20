var myApp = angular.module('myApp', ['ngRoute'])

//Config route provider
//Hosts home page with
//Weather as focus
//and other templates as side data
//
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'HomeController',
    })
   .when('/calender/', {
    templateUrl: 'templates/calender.html',
    controller: 'CalanderController',
  })
   .when('/reminders/', {
    templateUrl: 'templates/reminders.html',
    controller: 'RemindersController',
  })
})

// Landing page controller
.controller('HomeController', function($scope){
  //holy shit scopes can be passed into controllers

  //$scope.number = 20  
})

// About page controller
.controller('CalenderController', function($scope){
//Again #about scope passed in

  $scope.about = "Here's some information about this page."
})

// Content controller
.controller('RemindersController', function($scope){
//Again #url scope passed in

  //$scope.url = "http://conference.unavsa.org/wp-content/uploads/2015/06/SEA-pic.jpg"
})

jQuery(document).ready(function(){
    $( "#loader" ).delay(800).fadeOut(400, function(){
        $( "#your-page" ).fadeIn(400);
    });  
});