function UsersCtrl($scope, Session, User, $timeout) {"use strict";

    $scope.login = function(user) {
        Session.login(user.email, user.password)
        .then(function(response) {
            if (!response) {
                $scope.messages.setCurrent('errors', "Credentials are not valid!");
            } else {
                $scope.models.user = response;
                $scope.messages.setNext("Welcome back " + $scope.models.user.name + "!!");
            }
        }, function(response) {
            $scope.messages.setCurrent('errors', "Server offline, please try in a few minutes");
        });
    };

    $scope.register = function(user) {
        Session.register(user.name, user.email, user.password, user.confirm_password)
            .then(function(response) {
                $scope.models.user = response;
                $scope.login(response);
            }, function(response) {
                $scope.messages.setCurrent('errors', response.data.errors);
            });
    };
}

function UserOptionsCtrl($scope, Session, User, $timeout, users) {"use strict";

    $scope.users = users;
    console.log($scope.users);
    

    // $scope.login = function(user) {
        
    //     Session.login(user.email, user.password)
    //     .then(function(response) {
    //         if (!response) {
    //             $scope.messages.setCurrent('errors', "Credentials are not valid!");
    //         } else {
    //             $scope.models.user = response;
    //             $scope.messages.setNext("Welcome back " + $scope.models.user.name + "!!");
    //         }
    //     }, function(response) {
    //         $scope.messages.setCurrent('errors', "Server offline, please try in a few minutes");
    //     });
    // };

    // $scope.register = function(user) {
    //     Session.register(user.name, user.email, user.password, user.confirm_password)
    //         .then(function(response) {
    //             $scope.login(response.user);
    //         }, function(response) {
    //             $scope.messages.setCurrent('errors', response.data.errors);
    //         });
    // };


}