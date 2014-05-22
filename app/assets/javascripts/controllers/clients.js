function ClientCtrl($scope, clients) {"use strict";
	
	$scope.clients = clients;

	$scope.edit = function(client){
		console.log("You edited " + client.name);
	}

	$scope.delete = function(client){
		console.log("You just deleted " + client.name);
	}

}

function ClientNewCtrl($scope, $location, Client) {"use strict";
  
  $scope.saveClient = function(){
    Client.saveClient($scope.client).then(function(response){
      $scope.messages.setNext(response.data.info);
    }, function(response){
      $scope.messages.setCurrent("errors", response.data.errors);      
    });
  }
}
