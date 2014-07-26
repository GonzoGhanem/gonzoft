angular.module('clientService', [])
    .factory('Client', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/clients/';
            $location.path(url);
        }
        var service = {
            getAllClients: function() {
                return $http({method: 'get', url:'/api/clients/index'})
                    .then(function(response) {
                        service.clients = response.data.clients;
                      return service.clients;
                    },
                    function(response){
                      redirect('/');
                    });
            },

            getById: function(client){
                return $http.get("/api/clients/" + client)
                    .then(function(response) {
                        service.client = response.data.show_client;
                        return service.client;
                    },
                    function(response){
                      redirect('/');
                    });  
            },

            clients: null,
            client: null,
            saveClient: function(client){
                return $http({ method: 'post' ,url:'/api/clients/create', data: client})
                    .success(function(data, status, headers, config){
                        redirect();
                    })
                    .error(function(data, status, headers, config){

                    });
            }
        };
        return service;
    });
