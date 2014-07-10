function TimeCtrl($scope, time, $filter) {"use strict";
  
  ////////////////////////////////
  // Vars definition  ////////////
  ////////////////////////////////
  var dayNamesShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  ////////////////////////////////
  // Scope Arrays  ///////////////
  ////////////////////////////////
  $scope.timelapses = [
    { name: "This" },
    { name: "Last" },
    { name: "Next" }
  ]
  $scope.standardTimelapse = $scope.timelapses[0]

  $scope.timeperiods = [
    { name: "Day" },
    { name: "Week" },
    { name: "Workday" },
    { name: "Month" },
  ]
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
    ]
  $scope.selectedDayType = $scope.daysType[0]

  $scope.clients = [
      { name: "Gonzoft Inc.", id: 1 },
      { name: "G2 Webservices", id: 2 },
      { name: "Kinnser", id: 3 },
      { name: "Euro Disney ", id: 4},
      { name: "Capital Venture LLC", id: 5 }
  ]
  $scope.selectedClient = $scope.clients[0]

  $scope.AllProjects = [
      { name: "Gonzoft Inc.", client_id: 1, id: 1 },
      { name: "Internal", client_id: 1, id: 2 },
      { name: "Bench", client_id: 1, id: 3 },
      { name: "MNT", client_id: 2, id: 4 },
      { name: "Sentinel", client_id: 2, id: 4 },
      { name: "CSS", client_id: 2, id: 5 },
      { name: "Fraud File", client_id: 2, id: 6 },
      { name: "Global Boarding", client_id: 2, id: 7 },
      { name: "MNT", client_id: 3, id: 8 },
      { name: "Bizzarro", client_id: 3, id: 9 },
      { name: "EDT1", client_id: 4, id: 10 },
      { name: "EDT2", client_id: 4, id: 11 },
      { name: "Capital Team Zeta", client_id: 5, id: 12 },
      { name: "Capital Team Onion", client_id: 5, id: 13 },
      //{ name: "This is a very long text that only wants to hede the gaver", client_id: 5, id: 14 }
  ]
  $scope.projects = [ $scope.AllProjects[0], $scope.AllProjects[1], $scope.AllProjects[2] ]
  $scope.selectedProject = $scope.projects[0]

  $scope.timetrack = { days: [] }

  ////////////////////////////////
  // Methods  ////////////////////
  ////////////////////////////////
  $scope.nextDay = function(x, timeperiod) {
    var dayInMilisecs = 24 * 60 * 60 * 1000 // How many milisecs are in one day
    var today = new Date()
    var diff = (today.getDay() + 6) % 7 // Days to subtract to get last Monday
    var day

    if(timeperiod == "Day") {
      day = new Date(today.getTime() + x * dayInMilisecs)
    } else if(timeperiod == "Month") {
      var monthDay = today.getDate()
      var monthDiff = parseInt(monthDay/7)
      var monthModif = ((monthDiff*7) - 1)
      day = new Date(today.getTime() + (x - diff - monthModif) * dayInMilisecs)
    } else {
      day = new Date(today.getTime() + (x - diff) * dayInMilisecs) 
    }
    return day
  }

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
    $scope.cleanTimetrack()
    var timelapse = $("#timelapse option:selected").text() || "This"
    var timeperiod = $("#timeperiod option:selected").text() || "Month"
    var daysToShow = 0
    var startingAt = 0 
   
    switch (timeperiod) {
      case "Day":
        daysToShow = startingAt = 1
        break
      case "Workday":
        daysToShow = 5
        startingAt = 7
        break
      case "Week":
        daysToShow = startingAt = 7
        break
      case "Month":
        daysToShow = startingAt = $scope.getMonthDays(timelapse)
        break
    }

    var daysModification = 0
    switch (timelapse) {
      case "This":
        break
      case "Last":
        daysModification = startingAt*-1
        break
      case "Next":
        daysModification = startingAt
        break
    }

    for (var i = 0; i < daysToShow; i++) {
      $scope.addNewDay($scope.nextDay(i+daysModification, timeperiod), false)
    }

  };

  $scope.getFirstWeekday = function(date) {
    var unformmatedFirstWeekday = new Date(date.setDate(date.getDate() - date.getDay()))
    return $scope.getFormattedDate(unformmatedFirstWeekday)
  };

  $scope.getLastWeekday = function(date) {
    var unformmatedLastWeekday = new Date(date.setDate(date.getDate() - date.getDay()+6))
    return $scope.getFormattedDate(unformmatedLastWeekday)
  }

  $scope.getFormattedDate = function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return day+"/"+month+"/"+year
  };

  $scope.getWeekday = function(date) {
    return dayNamesShort[date.getDay()]
  };

  var day_id = 0;
  $scope.addNewDay = function(date, isExtra) {
    var todayFormmated = $scope.getFormattedDate(date)
    var todayWeekday = $scope.getWeekday(date)
    var hours = 8
    var time = date.getTime()
    if(todayWeekday == 'Sat' || todayWeekday == 'Sun' || isExtra)
      hours = 0

    $scope.timetrack.days.push({
      "id": day_id,
      "time": time,
      "day": date,
      "date": todayFormmated,
      "weekday": todayWeekday,
      "type": $scope.selectedDayType.name,
      "client_name": $scope.selectedClient.name,
      "project_name": $scope.selectedProject.name,
      "hours": hours,
      "notes": "",
      "isExtra": isExtra  
    })
    day_id++
  }

  $scope.getClientIdByClientName = function(client_name) {
    for(var i = 0; i < $scope.clients.length; i++) {
      if($scope.clients[i].name == client_name) {
        return $scope.clients[i].id
      }
    }
  }

  $scope.getProjectIdByProjectName = function(project_name) {
    for(var i = 0; i < $scope.projects.length; i++) {
      if($scope.projects[i].name == project_name) {
        return $scope.projects[i].id
      }
    }
  }

  $scope.setProject = function(day) {
    var project_name = $("#project_dropdown_" + day.id + "  option:selected").text()
    $scope.updateDay(day, "project_name", project_name)
  }

  $scope.setDayType = function(day, selectedDayType) {
    $scope.updateDay(day, "day_type", selectedDayType.name)
  }  

  $scope.setClientProjects = function(day, selectedClient) {
    $scope.tmpProjects = []
    $scope.updateDay(day, "client_name", selectedClient.name)    
    for( var i = 0; i < $scope.AllProjects.length; i++ ) {
      if($scope.AllProjects[i].client_id == $scope.getClientIdByClientName(day.client_name) ) {
        $scope.tmpProjects.push($scope.AllProjects[i])
      }
    }
    $scope.selectedProject = $scope.projects[0]
    var select = $("#project_dropdown_" + day.id)[0];
    $("#project_dropdown_" + day.id).html("")
    for(var i = 0; i < $scope.tmpProjects.length; i++) {
      select.add(new Option($scope.tmpProjects[i].name, i));
    }
  }

  $scope.updateDay = function(day, field, value) {

    console.log("Setting " + field + " to " + value + " for " + day.date)
    console.log(value)

    for(var i = 0; i < $scope.timetrack.days.length; i++) {
      if($scope.timetrack.days[i].time == day.time) {        
        switch (field) {
          case "client_name":
            $scope.timetrack.days[i].client_name = value  
            break
          case "project_name":
            $scope.timetrack.days[i].project_name = value
            break
          case "day_type":
            $scope.timetrack.days[i].type = value
            break
        }
      }
    }
  }

  var totalAddedDays = 0;
  $scope.addDay = function(day) {
    totalAddedDays++
    $scope.addNewDay(day.day, true)
  }

  $scope.removeDay = function(day) {
    totalAddedDays--
    $.each($scope.timetrack.days, function(i){
      if($scope.timetrack.days[i].id === day.id) {
        $scope.timetrack.days.splice(i, 1)
        return false
      }
    })
  }

  ////////////////////////////////
  // Statistics Methods  /////////
  ////////////////////////////////
  $scope.getTotal = function(){
    var total = 0
    for(var i = 0; i < $scope.timetrack.days.length; i++){
        var day = $scope.timetrack.days[i]
        total += parseInt(day.hours)
    }
    return total
  }

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
  }

  $scope.getUncompleted = function(){
    var uncompletedDays = 0
    for(var i = 0; i < $scope.timetrack.days.length; i++){
      var day = $scope.timetrack.days[i]
      if(day.hours == 0 && day.weekday != "Sat" && day.weekday != "Sun")
        uncompletedDays += 1
    }
    return uncompletedDays
  }

  $scope.getTotalEntries = function(){
    return $scope.timetrack.days.length;
  }

  $scope.getTotalExtraEntries = function(){
    var extraDays = 0
    for(var i = 0; i < $scope.timetrack.days.length; i++){
      var day = $scope.timetrack.days[i]
      if(day.isExtra)
        extraDays++
    }
    return extraDays
  }

  ////////////////////////////////
  // Main  ///////////////////////
  ////////////////////////////////
  $scope.refreshTimetrack()

}

