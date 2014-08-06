angular.module('userService', [])
    .factory('User', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }
        var service = {
            update: function(user) {
                // return $http.put('/api/users', {id: user.id, user: {name: user.name, email: user.email, password: user.password, roles_attributes: user.roles, position_id: user.position_id}  })
                return $http.put('/api/users', {user: user}  )
                    .then(function(response) {
                        service.currentUser = response.data.user;
                        if (service.isAuthenticated()) {
                            $location.path(response.data.redirect);
                        }
                        return service.currentUser;
                    });
            },

            currentUser: null,

            isAuthenticated: function(){
                return !!service.currentUser;
            },

            getById: function(user_id) {
                return $http.get('/api/users/' + user_id)
                    .then(function(response){
                        return response.data.user;
                    })
            }

        };
        return service;
    });
