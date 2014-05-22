angular.module('messageService', [])
    .factory('Messages', function($rootScope) {
        
        var queue = [], currentMessage = '';
  
        $rootScope.$on('$routeChangeSuccess', function() {
            debugger;
            if (queue.length > 0) 
                currentMessage = queue.shift();
            else
                currentMessage = '';
        });

        return {
            set: function(message) {
                queue.push(message);
            },
            get: function() {
                debugger;
                return currentMessage;
            }
        };

    });