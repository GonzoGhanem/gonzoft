angular.module('projectService', [])
    .factory('Project', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/clients/';
            $location.path(url);
        }
        var service = {
            getProjectsByClient: function(client_id) {
                return $http.get("/api/client/" + client_id + "/projects/")
                    .then(function(response) {
                        service.projects = response.data.projects;
                      return service.projects;
                    },
                    function(response){
                      redirect('/');
                    });
            },

            create: function(project) {
            	// return $http.post("/api/client/" + project.client_id + "/project/new", {name: project.name, startdate: project.startdate, enddate: project.enddate, client_id: project.client_id})
                return $http.post("/api/client/" + project.client_id + "/project/new", project)
                    .then(function(response) {
                        service.project = response.data.project;
                      	return service.project;
                    },
                    function(response){
                      redirect('/');
                    });
            },

            projects: null
        };
        return service;
    });
