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

            clients: null,

            saveClient: function(client){
                return $http({ method: 'post' ,url:'/api/clients/create', data: client})
                    .success(function(data, status, headers, config){
                        redirect();
                    })
                    .error(function(data, status, headers, config){

                    });
                    // .then(function(response) {
                    //     console.log('1');
                    //     redirect();
                    //     return response;
                    // }, function(response){
                    //     debugger;
                    // });
                        // if(response.status == 200) {
                        //     $scope.messages.setNext("Client {{response.data.client.name}} added successfully!!");
                        //     return response;
                        // } else {
                        //     $scope.messages.setCurrent('errors', response.data.errors);
                        // }
                        // var myResponse = {};
                        // if(response.status == 200) {
                        //     myResponse = response.data.client;
                        //     return myResponse;

                        // } else if (response.status == 401) {
                        //     myResponse = response.data.errors;
                        //     return myResponse;
                        // }
            }
        };
        return service;
    });
