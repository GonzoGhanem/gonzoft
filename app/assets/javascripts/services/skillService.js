angular.module('skillService', [])
    .factory('Skill', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }
        var service = {
            insertSkill: function(skill) {
                return $http.post('/api/skills/', {name: skill.name, description: skill.description })
                    .then(function(response) {
                        return response.data;
                    });
            },
            deleteSkill: function(skill) {
                return $http.delete('/api/skills/' + skill.id)
                    .then(function(response){
                        return response.data;
                    });
            },
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
