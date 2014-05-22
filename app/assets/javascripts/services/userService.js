angular.module('userService', [])
    .factory('User', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }
        var service = {
            update: function(user) {
                return $http.put('/api/users', {id: user.id, user: {name: user.name, email: user.email, password: user.password} })
                    .then(function(response) {
                        service.currentUser = response.config.data.user;
                        if (service.isAuthenticated()) {
                            $location.path(response.data.redirect);
                        }
                        return service.currentUser;
                    });
            },

            currentUser: null,

            isAuthenticated: function(){
                return !!service.currentUser;
            }

        };
        return service;
    });
