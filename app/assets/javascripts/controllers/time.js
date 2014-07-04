function TimeCtrl($scope, time, $filter) {"use strict";
  
  // Vars definition
  var dayNamesShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // Methods
  $scope.nextDay = function(x) {
    var dayInMilisecs = 24 * 60 * 60 * 1000
    var today = new Date()
    var diff = (today.getDay() + 6) % 7 // Days to subtract to get last Monday
    return new Date(today.getTime() + (x - diff) * dayInMilisecs)
  };

  $scope.cleanTimetrack = function(){
    $scope.timetrack.days = []
  }

  $scope.getMonthDays = function(timelapse) {
    var date = new Date()
    var month = date.getMonth()
    if (timelapse == "Last") month = month-1
    else if (timelapse == "Next") month = month+1
    return monthDays[month]
  }

  $scope.refreshTimetrack = function() {
    var timelapse = $("#timelapse option:selected").text() || "This";
    var timeperiod = $("#timeperiod option:selected").text() || "Month";

    $scope.cleanTimetrack()
    var daysToShow = 0;

    console.log("Show: " + timelapse + " " + timeperiod)

    switch (timeperiod) {
      case "Day":
        daysToShow = 1
        break
      case "Weekday":
        daysToShow = 5
        break
      case "Week":
        daysToShow = 7
        break
      case "Month":
        daysToShow = $scope.getMonthDays(timelapse)
        break
    }

    switch (timelapse) {
      case "This":
        break
      case "Last":
        break
      case "Next":
        break
    }

    for (var i = 0; i < daysToShow; i++) {
      $scope.addNewDay($scope.nextDay(i), false)
    }

  };

  $scope.getFirstWeekDay = function(date) {
    var unformmatedFirstWeekDay = new Date(date.setDate(date.getDate() - date.getDay()))
    return $scope.getFormattedDate(unformmatedFirstWeekDay)
  };

  $scope.getLastWeekDay = function(date) {
    var unformmatedLastWeekDay = new Date(date.setDate(date.getDate() - date.getDay()+6))
    return $scope.getFormattedDate(unformmatedLastWeekDay)
  }

  $scope.getFormattedDate = function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return day+"/"+month+"/"+year
  };

  $scope.getWeekday = function(date) {
    return dayNamesShort[date.getDay()];
  };

  var day_id = 0;
  $scope.addNewDay = function(date, isExtra) {
    var todayFormmated = $scope.getFormattedDate(date);
    var todayWeekday = $scope.getWeekday(date);
    var hours = 8;
    if(todayWeekday == 'Sat' || todayWeekday == 'Sun' || isExtra)
      hours = 0;

    $scope.timetrack.days.push({
      "id": day_id,
      "day": date,
      "date": todayFormmated,
      "weekday": todayWeekday,
      "type": "Regular",
      "client_name": "Gonzoft Inc.",
      "project_name": "Atomix",
      "hours": hours,
      "notes": "",
      "isExtra": isExtra  
    });
    day_id++
  };

  var totalAddedDays = 0;
  $scope.addDay = function(day) {
    totalAddedDays++
    $scope.addNewDay(day.day, true)
  };

  $scope.removeDay = function(day) {
    totalAddedDays--
    $.each($scope.timetrack.days, function(i){
      if($scope.timetrack.days[i].id === day.id) {
        $scope.timetrack.days.splice(i, 1);
        return false;
      }
    })
  };

  $scope.getTotal = function(){
    var total = 0
    for(var i = 0; i < $scope.timetrack.days.length; i++){
        var day = $scope.timetrack.days[i]
        total += parseInt(day.hours)
    }
    return total
  };

  $scope.getExtraTime = function(){
    var regular = parseInt(8*$scope.timetrack.days.length)
    var total = 0
    var daysInPeriod = 0
    for(var i = 0; i < $scope.timetrack.days.length; i++){
        var day = $scope.timetrack.days[i]
        total += parseInt(day.hours)
        if(!day.isExtra && day.weekday != "Sat" && day.weekday != "Sun") {
          daysInPeriod += 1
        }
    }
    var regular = parseInt(8*daysInPeriod)
    return total-regular
  };

  $scope.getUncompleted = function(){
    var uncompletedDays = 0
    for(var i = 0; i < $scope.timetrack.days.length; i++){
      var day = $scope.timetrack.days[i]
      if(day.hours == 0 && day.weekday != "Sat" && day.weekday != "Sun")
        uncompletedDays += 1
    }
    return uncompletedDays
  };

  $scope.getTotalEntries = function(){
    return $scope.timetrack.days.length;
  };

  $scope.getTotalExtraEntries = function(){
    var extraDays = 0
    for(var i = 0; i < $scope.timetrack.days.length; i++){
      var day = $scope.timetrack.days[i]
      if(day.isExtra)
        extraDays++
    }
    return extraDays
  };

  $scope.timelapses = [
    { name: "This" },
    { name: "Last" },
    { name: "Next" }
  ];
  $scope.standardTimelapse = $scope.timelapses[0]

  $scope.timeperiods = [
    { name: "Day" },
    { name: "Week" },
    { name: "Weekday" },
    { name: "Month" },
  ];
  $scope.standardPeriod = $scope.timeperiods[3]

  $scope.daysType = [
      { name: "Regular" },
      { name: "Holiday" },
      { name: "Holiday Worked" },
      { name: "Comp Bank" },
      { name: "Comp Taken" },
      { name: "Medical Leave" },
      { name: "Marriage" },
      { name: "Maternity" },
      { name: "Vacation" },
      { name: "Study" },
      { name: "Overtime" },
    ];
  $scope.standardDayType = $scope.daysType[0]   

  $scope.timetrack = { days: [] }


  $scope.refreshTimetrack()

}

