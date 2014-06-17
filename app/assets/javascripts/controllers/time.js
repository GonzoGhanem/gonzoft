function TimeCtrl($scope, time) {"use strict";
  
  $scope.colors = [
    {name:'black', shade:'dark'},
    {name:'white', shade:'light'},
    {name:'red', shade:'dark'},
    {name:'blue', shade:'dark'},
    {name:'yellow', shade:'light'}
  ];
  $scope.myColor = $scope.colors[2]; // red


  $scope.timelapses = [
    { name: "This" },
    { name: "Last" },
    { name: "Next" }
  ];
  $scope.standardTimelapse = $scope.timelapses[0]; 

  $scope.timetrack = {
    days: []};

  $scope.timetrack.days.splice(0, 0, {
      "day_index" : "0",
      "day_id": "19072014",
      "date": "19/07/2014",
      "weekday": "Mon",
      "type": "Regular",
      "client_name": "Gonzoft Inc.",
      "project_name": "Atomix",
      "hours": 8,
      "notes": ""
    });
  $scope.timetrack.days.splice(10, 0, {
      "day_index" : "10",
      "day_id": "20072014",
      "date": "20/07/2014",
      "weekday": "Tue",
      "type": "Regular",
      "client_name": "Gonzoft Inc.",
      "project_name": "Atomix",
      "hours": 8,
      "notes": ""
    });
  $scope.timetrack.days.splice(20, 0, {
      "day_index" : "20",
      "day_id": "21072014",
      "date": "21/07/2014",
      "weekday": "Wed",
      "type": "Regular",
      "client_name": "Gonzoft Inc.",
      "project_name": "Atomix",
      "hours": 8,
      "notes": ""
    });
  $scope.timetrack.days.splice(30, 0, {
      "day_index" : "30",
      "day_id": "22072014",
      "date": "22/07/2014",
      "weekday": "Thu",
      "type": "Regular",
      "client_name": "Gonzoft Inc.",
      "project_name": "Atomix",
      "hours": 8,
      "notes": ""
    });
  $scope.timetrack.days.splice(40, 0, {
      "day_index" : "40",
      "day_id": "23072014",
      "date": "23/07/2014",
      "weekday": "Fri",
      "type": "Regular",
      "client_name": "Gonzoft Inc.",
      "project_name": "Atomix",
      "hours": 8,
      "notes": ""
    });

  function updateTimeLapseFilter() {
    alert("updateWhenFilter");
  }
 
  function createNewDayEntry(date) {"use strict";
    alert(date)
  }

  // $scope.edit = function(time){
  //   console.log("You edited " + time);
  // }
  // $scope.delete = function(time){
  //   console.log("You just deleted " + time);
  // }
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
