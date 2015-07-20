var data

var baseURL = "http://api.openweathermap.org/data/2.5/forecast/city?id=5809844&mode=json&units=imperial"


var apiKey = "&APPID=0c02cd3e6c47bafe3bc17f4b7c38ef6c"

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
.controller('HomeController', function($scope, $http){
  //holy shit scopes can be passed into controllers
  $scope.getWeather = function() {
      $http.get(baseURL + apiKey).success(function(response){
        data = $scope.weather = response.list;
        console.log(data);
        $scope.day1 = data[3];
        $scope.day2 = data[11];
        $scope.day3 = data[19];
        $scope.day4 = data[27];
        $scope.day5 = data[35];
      })
    }
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

myApp.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});