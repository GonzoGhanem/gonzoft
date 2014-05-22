angular.module('skillService', [])
    .factory('Skill', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }
        var service = {
            updateUserSkill: function(userSkill) {
                return $http.put('/api/skills/user', {id: userSkill.id, skill_id: userSkill.skill_id, user_id: userSkill.user_id, years: userSkill.years })
                    .then(function(response) {
                        return response.data;
                    });
            },
            delete: function(userSkillId) {
            	return $http.put('/api/skills/removeFromUser', {id: userSkillId})
                    .then(function(response) {
                        return response.data;
                    });	
            }

        };
        return service;
    });
