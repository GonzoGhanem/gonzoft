angular.module('adminService', [])
    .factory('Admin', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/home/index.html';
            $location.path(url);
        }
        var service = {
            getAllUsers: function(user) {
                return $http({method: 'get', url:'/api/users/admin'})
                    .then(function(response) {
                        service.users = response.data.users;
	                    return service.users;
                    },
                    function(response){
                    	redirect();
                    });
            },

            getRoles: function() {
                return $http({method: 'get', url:'/api/users/roles'})
                    .then(function(response) {
                        service.roles = response.data.roles;
                        return service.roles;
                    },
                    function(response){
                        redirect();
                    });                
            },

            getAllSkills: function(){
                return $http({method: 'get', url:'/api/skills/index'})
                    .then(function(response) {
                        service.skills = response.data.skills;
                        return service.skills;
                    },
                    function(response){
                        redirect();
                    });                
            },
            users: null,
            roles: null,
            skills: null

        };
        return service;
    });
