//= require jquery.min
//= require suggest.min
//= require bootstrap
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
//= require helpers/profileHelper.js
//= require_self
//= require_tree .


// ================================ File Upload =================================== //
angular.module('app', [], function() {})
FileUploadCtrl.$inject = ['$scope']
function FileUploadCtrl(scope) {
    //============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox")
    scope.dropText = 'Drop files here...'

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        scope.$apply(function(){
            scope.dropText = 'Drop files here...'
            scope.dropClass = ''
        })
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var clazz = 'not-available'
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
        scope.$apply(function(){
            scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
            scope.dropClass = ok ? 'over' : 'not-available'
        })
    }, false)
    dropbox.addEventListener("drop", function(evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        scope.$apply(function(){
            scope.dropText = 'Drop files here...'
            scope.dropClass = ''
        })
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            scope.$apply(function(){
                scope.files = []
                for (var i = 0; i < files.length; i++) {
                    scope.files.push(files[i])
                }
            })
        }
    }, false)
    //============== DRAG & DROP =============

    scope.setFiles = function(element) {
    scope.$apply(function(scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        scope.files = []
        for (var i = 0; i < element.files.length; i++) {
          scope.files.push(element.files[i])
        }
      scope.progressVisible = false
      });
    };

    scope.uploadFile = function() {
        var fd = new FormData()
        for (var i in scope.files) {
            fd.append("uploadedFile", scope.files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", "/fileupload")
        scope.progressVisible = true
        xhr.send(fd)
    }

    function uploadProgress(evt) {
        scope.$apply(function(){
            if (evt.lengthComputable) {
                scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        scope.$apply(function(){
            scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
}
// ================================ File Upload =================================== //




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
      .when('/user/options', {
        templateUrl:'/users/options.html', 
        controller: UserOptionsCtrl,
        resolve: {
          users: ['Admin', function(Admin){
            return "Guido, Gonzo"; //Admin.getRoles();
          }]
        }
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
        //$scope.models.user.image = "/images/" + current_user.name;       
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

        $("#bs-example-navbar-collapse-1").collapse('show');
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
                if(type == 'errors'){
                  currentMessage.success = "";
                  currentMessage.errors = message;
                }
                else {
                  currentMessage.errors = "";
                  currentMessage.success = message;
                }
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
