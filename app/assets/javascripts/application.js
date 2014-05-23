//= require jquery.min
//= require suggest.min
//= require ui-bootstrap-tpls-0.11.0
//= require angular-strap.min
//= require services/adminService
//= require services/clientService
//= require services/recordService
//= require services/sessionService
//= require services/skillService
//= require services/userService
//= require controllers/app
//= require controllers/admin
//= require controllers/clients
//= require controllers/profile
//= require controllers/record
//= require controllers/skills
//= require controllers/users
//= require controllers/userskills
//= require directives/navigation/navigation
//= require directives/checklist-model/checklist-model


var myApp = angular.module('gonzoft', ['ngRoute', 'ui.bootstrap', 'userService', 'sessionService','recordService', 'adminService', 'clientService', 'skillService','$strap.directives'])
  .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/users/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(interceptor);
  }])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/home/index.html'
      })
      .when('/record', {
        templateUrl: '/record/index.html', 
        controller: RecordCtrl
      })
      .when('/clients', {
        templateUrl: '/clients/index.html',
        controller: ClientCtrl,
        resolve: {
          clients: ['Client', function(Client){
            return Client.getAllClients();
          }]
        }
      })
      .when('/client/new', {
        templateUrl: '/clients/new.html',
        controller: ClientNewCtrl
      })
      .when('/users/login', 
        {templateUrl: '/users/login.html', 
        controller: UsersCtrl
      })
      .when('/users/index', 
        {templateUrl: '/admin/users.html', 
        controller: AdminCtrl,
        resolve: {
          users: ['Admin', function(Admin){
            return Admin.getAllUsers();
          }]
        }
      })
      .when('/users/register', {
        templateUrl:'/users/register.html',  
        controller:UsersCtrl
      })
      .when('/skills/index', {
        templateUrl:'/admin/skills.html',  
        controller:SkillsCtrl,
        resolve: {
          skills: ['Admin', function(Admin){
            return Admin.getAllSkills();
          }]
        }
      })
      .when('/user/skills', {
        templateUrl:'/users/skills.html', 
        controller:UserSkillsCtrl,
        resolve: {
          skills: ['Admin', function(Admin){
            return Admin.getAllSkills();
          }]
        }
      })
      .when('/skill/new', {
        templateUrl:'/admin/new_skill.html',  
        controller:SkillsCtrl
      })
      .when('/user/profile', {
        templateUrl:'/users/profile.html', 
        controller:ProfileCtrl,
        resolve: {
          roles: ['Admin', function(Admin){
            return Admin.getRoles();
          }]
        }
      });
  }])
  .controller('AppCtrl', ['$scope', 'Session', '$timeout', 'messages', function($scope, Session, $timeout, messages){
    $scope.models = {};
    $scope.models.user = null;
    
    $scope.messages = messages;

    Session.requestCurrentUser().then(function(current_user) {
        $scope.models.user = current_user;
        if($scope.models.user) {
          for(var role in $scope.models.user.roles){
            if($scope.models.user.roles[role].name == "admin"){
              $scope.models.user.is_admin = true;
            }
          }
        }
      }
    );

    $scope.$on('event:unauthorized', function(event) {
        $scope.messages.setCurrent('errors',"Necesita identificarse para ingresar.");
    });

    $scope.$on('event:authenticated', function(event) {
        $scope.messages.setCurrent('errors',"Necesita identificarse para ingresar.");
    });

    $scope.logout = function(){
      Session.logout();
      $scope.models.user = null;
    };

  }])
  .directive('navigation', [function () {
    return {
      restrict: 'E',
      templateUrl: '/assets/directives/navigation/navigation.html',
      controller: ['$scope', '$filter','Session', function($scope, $filter, Session){
        $scope.has_role = function(role){
          if($scope.models.user) {
            return !!$filter('filter')($scope.models.user.roles, role, true).length;
          }
        }
      }]
    };

  }])

  .factory('messages', function($rootScope) {
        
        var queueNext = [], currentMessage = {errors: '', success:''}, nextMessage = '';
  
        $rootScope.$on('$routeChangeSuccess', function() {
            currentMessage = {
              errors: '',
              success: ''
            };
            if (queueNext.length > 0) {
                nextMessage = queueNext.shift();
            }
            else {
                nextMessage = '';
            }
        });

        return {
            setCurrent: function(type, message) {
                if(type == 'errors')
                  currentMessage.errors = message;
                else 
                  currentMessage.success = message;
            },
            getCurrent: function(type, message) {
                if(type == 'errors')
                  return currentMessage.errors;
                else
                  return currentMessage.success;
            },
            setNext: function(message) {
                queueNext.push(message);
            },
            getNext: function() {
                return nextMessage;
            }
        };

    });
