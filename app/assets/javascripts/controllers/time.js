function TimeCtrl($scope, time) {"use strict";
  
  // $scope.items = [
  //   {id:"0", name: "Javascript" },
  //   {id:"1", name: "C/C++" },
  //   {id:"2", name: "AngularJS" },
  // ]
  // $scope.colorful = 0;

  $scope.time = "Now"
  $scope.population = 7000;
  $scope.countries = [
    {id: 1, name: 'France', population: 63.1},
    {id: 2, name: 'United Kingdom', population: 61.8}
  ];

  //$scope.user_name = models.user.name;
 
  $scope.edit = function(time){
    console.log("You edited " + time);
  }
  $scope.delete = function(time){
    console.log("You just deleted " + time);
  }
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
