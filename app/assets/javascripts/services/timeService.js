angular.module('timeService', [])
    .factory('Time', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/time/';
            $location.path(url);
        }
        var service = {
            //// Time Tracker Methods
            getTimeTracker: function(time) {
              return $http({method: 'get', url: '/api/time/index'})
                .then(function(response) {
                  service.time = response.data.time;
                  return service.time;
                },
                function(response) {
                  redirect('/');
                });
            },
            saveTimeTrack: function(time){
              return $http({ method: 'post' ,url:'/api/time/save', data: time})
              .success(function(data, status, headers, config){
                redirect();
              })
              .error(function(data, status, headers, config){
                console.log("Error saving the Time Track")
              });
            }

        };
        return service;
    });