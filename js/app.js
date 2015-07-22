var days = [];

var todos = todos = [
    {text:'Finish final project', done:false},         
    {text: 'Submit group evals', done:false}
  ];

var city = "London, ENG";

var lat = 51.5072;

var lon = 0.1275;

var baseURL = "http://api.openweathermap.org/data/2.5/forecast?";

var apiKey = "&mode=json&units=imperial&APPID=0c02cd3e6c47bafe3bc17f4b7c38ef6c";

var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.calendar'])

//Config route provider
//Hosts home page with
//Weather as focus
//and other templates as side data
//
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
      templateUrl: 'templates/settings.html',
      controller: 'SettingsController',
    })
    .when('/home/', {
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

//Calender controller
.controller('CalendarController', function($scope, $compile, uiCalendarConfig) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
})

//Home page controller
.controller('HomeController', function($scope, $http){


  $scope.getWeather = function() {
        $scope.city = city;
        $scope.lat = lat;
        $scope.lon = lon
        days = [];
        $http.get(baseURL + 'lat=' + lat + '&lon=' + lon + apiKey).success(function(response) {
            var data = response.list;
            for (i = 3; i <= 35; i = i + 8) {
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


// Reminders controller
.controller('RemindersController', function($scope) {
  
  $scope.todos = todos;
  
  $scope.getTotalTodos = function () {
    return $scope.todos.length;
  };
  
  
  $scope.addTodo = function () {
    $scope.todos.push({text:$scope.formTodoText, done:false});
    $scope.formTodoText = '';
  };
  
    $scope.clearCompleted = function () {
        $scope.todos = _.filter($scope.todos, function(todo){
            return !todo.done;
        });
    };
})

//Settings controller
.controller('SettingsController',function($scope, $http, $location){
    $scope.search=function() {
        $http.get( "http://api.zippopotam.us/us/"+$scope.zip).
        success(function(response){
            $scope.data=response;
            lat = $scope.data.places[0].latitude;
            lon = $scope.data.places[0].longitude;
            city = $scope.data.places[0]['place name'] + ', ' + $scope.data.places[0]['state abbreviation'];
            $location.path("/home");
        })
        .error(function() {
            alert('No!')
        })
    }

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

myApp.filter('format', function() {
  return function(input, format) {
    return moment(new Date(input)).format(format);
  };
})