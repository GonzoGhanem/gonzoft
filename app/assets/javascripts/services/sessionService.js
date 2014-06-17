angular.module('sessionService', [])
    .factory('Session', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }
        var service = {
            login: function(email, password) {
                return $http.post('/api/sessions', {user: {email: email, password: password} })
                    .then(function(response) {
                        service.currentUser = response.data.user_create;
                        if (service.isAuthenticated()) {
                            $location.path('/record');
                        }
                        
                        return service.currentUser;
                    });
            },

            logout: function(redirectTo) {
                $http.delete('/api/sessions').then(function(response) {
                    $http.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
                    service.currentUser = null;
                    redirect(redirectTo);
                });
            },

            register: function(name, email, password, confirm_password) {
                return $http.post('/api/users', {user: {name: name, email: email, password: password, password_confirmation: confirm_password} })
                .then(function(response) {
                    service.currentUser = response.data.user_create;
                    if (service.isAuthenticated()) {
                        $location.path('/record');
                    }
                    if(service.currentUser) {
                            service.currentUser.roles = response.data.user_roles;
                        }
                    return service.currentUser;
                });
            },
            requestCurrentUser: function() {
                if (service.isAuthenticated()) {
                    return $q.when(service.currentUser);
                } else {
                    return $http.get('/api/users').then(function(response) {
                        service.currentUser = response.data.user;
                        
                        return service.currentUser;
                    });
                }
            },

            currentUser: null,

            isAuthenticated: function(){
                return !!service.currentUser;
            }
        };
        return service;
    });
