var days = [];

var baseURL = "http://api.openweathermap.org/data/2.5/forecast/city?id=5809844&mode=json&units=imperial";

var apiKey = "&APPID=0c02cd3e6c47bafe3bc17f4b7c38ef6c";

var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate'])

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
   .when('/calendar/', {
    templateUrl: 'templates/calender.html',
    controller: 'CalendarController',
  })
   .when('/reminders/', {
    templateUrl: 'templates/reminders.html',
    controller: 'RemindersController',
  })
})

// Landing page controller
.controller('HomeController', function($scope, $http){


  $scope.getWeather = function() {
        days = [];
        $http.get(baseURL + apiKey).success(function(response) {
            var data = response.list;
            for (i = 2; i <= 35; i = i + 8) {
                if (data[i].weather[0].main == "Clear") {
                    data[i].weather[0].icon = "wi wi-day-sunny"
                } else if (data[i].weather[0].main == "Rain") {
                    data[i].weather[0].icon = "wi wi-sprinkle"
                } else if (data[i].weather[0].main == "Clouds") {
                    data[i].weather[0].icon = "wi wi-cloudy"
                } else {
                    data[i].weather[0].icon = "wi wi-day-cloudy"
                }
                days.push(data[i]);
            }
        console.log(days);
        $scope.days = days;

      })
    }
    angular.element(document).ready(function () {
        if (days !== []) {
            $scope.getWeather();
        }
    });

})

// About page controller
.controller('CalendarController', function($scope) {


})

// Content controller
.controller('RemindersController', function($scope) {
    
})

//Tooltip functionality
myApp.directive('tooltip', function() {
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

//Clock functionality
myApp.directive('clock', ['dateFilter', '$timeout', function(dateFilter, $timeout){
    return {
        restrict: 'E',
        scope: {
            format: '@'
        },
        link: function(scope, element, attrs){
            var updateTime = function(){
                var now = Date.now();
                
                element.html(dateFilter(now, scope.format));
                $timeout(updateTime, now % 1000);
            };
            
            updateTime();
        }
    };
}]);


//Filter string as int
myApp.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});