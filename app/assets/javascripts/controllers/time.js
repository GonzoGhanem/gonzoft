function TimeCtrl($scope, time) {"use strict";
  
  $scope.client_name = "Gonzoft"
  $scope.project_name = "Gonzoft Internal"
  $scope.hours = 8
  //$scope.user = models.user
  $scope.date = new Date()

  //$scope.user_name = models.user.name;
 
  $scope.edit = function(time){
    console.log("You edited " + time);
  }
  $scope.delete = function(time){
    console.log("You just deleted " + time);
  }
}

function createNewDayEntry (date) {"use strict";
  alert("Good!")
  alert(date)
}

/*
function TimeNewCtrl($scope, $location, Client) {"use strict";
  $scope.saveTime = function(){
    Time.save($scope.time).then(function(response){
      $scope.messages.setNext(response.data.info);
    }, function(response){
      $scope.messages.setCurrent("errors", response.data.errors);      
    });
  }
}
*/
