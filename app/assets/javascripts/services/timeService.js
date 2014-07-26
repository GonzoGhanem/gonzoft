angular.module('timeService', [])
  .factory('Time', function($location, $http, $q) {
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/time/index'
      $location.path(url)
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
            redirect('/')
          });
      },
      getNextId: function() {
        return $http({ method: 'post', url:'/api/time/getNextId', data: '' })
        .success(function(data, status, headers, config){})
        .error(function(data, status, headers, config){ console.log("Error getting the next id, probably database is empty") })
      },
      saveTimetrack: function(days){
        return $http({ method: 'post', url:'/api/time/save', data: { timetrack: days} })
        .success(function(data, status, headers, config){})
        .error(function(data, status, headers, config){ console.log("Error saving the Time Track") })
      },
      getTimetrack: function(user_id, date_from, date_to){
        var data = { "user_id": user_id, "date_from": date_from, "date_to": date_to }
        return $http({ method: 'post', url:'/api/time/filter', data: data, async: false })
        .success(function(data, status, headers, config){})
        .error(function(data, status, headers, config){ console.log("Error getting the Time Track") })
      }
    }
    return service
})