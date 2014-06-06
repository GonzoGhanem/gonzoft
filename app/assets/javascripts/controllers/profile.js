function ProfileCtrl($scope, User, roles, Session) {"use strict";
    
    $scope.user = $scope.models.user;

    $scope.roles = roles;

    $scope.updateProfile = function(user) {
        $scope.processing = true;
        User.update(user)
            .then(function(response) {
                $scope.user = response;
                if ($scope.user.id == $scope.models.user.id ){
                    $scope.models.user = response;
                }
                $scope.messages.setCurrent('success', "Perfil Actualizado!!");
                $scope.processing = false;
            }, function(response) {
                $scope.messages.setCurrent('errors', response.data.errors);
                $scope.processing = false;
            });
   
    };

    $scope.onImageSelected = function(file) {
        console.log("New image: " + file);
    };
}