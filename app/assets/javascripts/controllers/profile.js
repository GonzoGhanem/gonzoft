function ProfileCtrl($scope, User, roles, positions, Session, $filter) {"use strict";
    
    $scope.user = $scope.models.user;
    $scope.roles = roles;
    $scope.positions = positions;
    $scope.user.position = $filter('filter')($scope.positions, {id : $scope.user.position_id}, true)[0];
    // $scope.user.position =  | filter:{id:user.position_id}

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