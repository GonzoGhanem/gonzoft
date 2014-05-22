function AdminCtrl($scope, users) {"use strict";
	
	$scope.users = users;

	$scope.edit = function(user){
		console.log("You edited " + user.name);
	}

	$scope.delete = function(user){
		console.log("You just deleted " + user.name);
	}
}
