function TimeCtrl($scope, Time, $filter) {"use strict";
  

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
  $scope.standardPeriod = $scope.timeperiods[2]

  $scope.daysType = [
      { id: 1, name: "Regular" },
      { id: 2, name: "Holiday" },
      { id: 3, name: "Holiday Worked" },
      { id: 4, name: "Comp Bank" },
      { id: 5, name: "Comp Taken" },
      { id: 6, name: "Medical Leave" },
      { id: 7, name: "Marriage" },
      { id: 8, name: "Maternity" },
      { id: 9, name: "Vacation" },
      { id: 10, name: "Study" },
      { id: 11, name: "Overtime" },
    ]
  $scope.selectedDayType = $scope.daysType[0]

  $scope.clients = [
      { id: 1, name: "Gonzoft Inc." },
      { id: 2, name: "G2 Webservices" },
      { id: 3, name: "Kinnser" },
      { id: 4, name: "Euro Disney " },
      { id: 5, name: "Capital Venture LLC" }
  ]
  $scope.selectedClient = $scope.clients[0]

  $scope.AllProjects = [
      { id: 1, relative_id: 1, name: "Gonzoft Inc.", client_id: 1},
      { id: 2, relative_id: 2, name: "Internal", client_id: 1 },
      { id: 3, relative_id: 3, name: "Bench", client_id: 1 },
      { id: 4, relative_id: 1, name: "MNT", client_id: 2 },
      { id: 5, relative_id: 2, name: "Sentinel", client_id: 2 },
      { id: 6, relative_id: 3, name: "CSS", client_id: 2 },
      { id: 7, relative_id: 4, name: "Fraud File", client_id: 2 },
      { id: 8, relative_id: 5, name: "Global Boarding", client_id: 2 },
      { id: 9, relative_id: 1, name: "MNT", client_id: 3 },
      { id: 10, relative_id: 2, name: "Bizzarro", client_id: 3 },
      { id: 11, relative_id: 1, name: "EDT1", client_id: 4 },
      { id: 12, relative_id: 2, name: "EDT2", client_id: 4 },
      { id: 13, relative_id: 1, name: "Capital Team Zeta", client_id: 5 },
      { id: 14, relative_id: 2, name: "Capital Team Onion", client_id: 5 },
  ]
  $scope.projects = [ $scope.AllProjects[0], $scope.AllProjects[1], $scope.AllProjects[2] ]
  $scope.selectedProject = $scope.projects[0]
  $scope.timetrack = { days: [] }
  $scope.daysFromServer = []
  $scope.daysFromServer.timetrack = []
  $scope.startingId = 0


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
    var date_specs = getDateModifications()
    for (var i = 0; i < date_specs.days_to_show; i++) {
      var addDay = true
      $.each($scope.daysFromServer, function(){
        var currentDate = $scope.getFormattedDate($scope.nextDay(i+date_specs.days_modification, date_specs.timeperiod)) 
        if(this.date == currentDate) { 
          addDay = false
          return false
        }
      })
      if(addDay)
        $scope.addNewDay($scope.nextDay(i+date_specs.days_modification, date_specs.timeperiod), false, {}, false)
    }

    $.each($scope.daysFromServer, function(){
      var dateMatchesParams = $scope.dateMatchesParams(this)
      if(dateMatchesParams && (this.isExtra == "t" || this.isExtra)) {
        $scope.addNewDay(new Date(this.day), true, this, true)
      } else {
        $scope.addNewDay(new Date(this.day), false, this, false)
      }
    })
  };

  $scope.dateMatchesParams = function(date){
    var day_date = ($scope.formatDate(date.date)).getTime()
    var dateMatchesParams = false
    var from_date = ($scope.formatDate($scope.getDateFrom())).getTime()
    var to_date = ($scope.formatDate($scope.getDateTo())).getTime()
    if( day_date >= from_date && day_date <= to_date ) 
      dateMatchesParams = true
    return dateMatchesParams
  }

  $scope.setDropDowns = function(){
    for(var i = 0; i < $scope.timetrack.days.length; i++) {
      var day = $scope.timetrack.days[i]
      var day_type_id
      var client_id
      var project_id
      
      $.each($scope.daysType, function(){
        if(this.name == day.day_type) day_type_id = this.id
      })
      
      $.each($scope.clients, function(){
        if(this.name == day.client_name) {
          client_id = this.id
          $scope.setClientProjects(day, { id: this.id, name: this.name })
        }
      })

      $.each($scope.AllProjects, function(){
        if(this.name == day.project_name) {
          project_id = this.relative_id
        }
      })

      $("#daytype_dropdown_" + day.day_id).val(day_type_id-1)
      $("#client_dropdown_" + day.day_id).val(client_id-1)
      $("#project_dropdown_" + day.day_id).val(project_id-1)
    }
  }

  $scope.getFirstWeekday = function(date) {
    var unformmatedFirstWeekday = new Date(date.setDate(date.getDate() - date.getDay()))
    return $scope.getFormattedDate(unformmatedFirstWeekday)
  };

  $scope.getLastWeekday = function(date) {
    var unformmatedLastWeekday = new Date(date.setDate(date.getDate() - date.getDay()+6))
    return $scope.getFormattedDate(unformmatedLastWeekday)
  }

  $scope.formatDate = function(date) {
    var arr = date.split('/')
    var day = arr[0]
    var month = arr[1]-1
    var year = arr[2]

    return new Date(year, month, day, 0, 0, 0)
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

  var day_id_counter = $scope.startingId;
  $scope.addNewDay = function(date, is_extra, day, fromServer) {
    var user_id, day_id, time, day, day_date, weekday, day_type, client_name, project_name, hours, notes, isDayExtra
    
    if(fromServer) var dateFromServer = day

    if(!fromServer) {
      user_id = $scope.models.user.id
      day_id = day_id_counter
      time = String(date.getTime())
      day = date
      day_date = $scope.getFormattedDate(new Date(date))
      weekday = $scope.getWeekday(date)
      day_type = $scope.selectedDayType.name
      client_name = $scope.selectedClient.name
      project_name = $scope.selectedProject.name
      hours = 8
      if(weekday == 'Sat' || weekday == 'Sun' || is_extra) {
        hours = 0
        day_type = "Overtime"
      }
      notes = ""        
      isDayExtra = is_extra
      day_id_counter++
    } else {
      user_id = dateFromServer.user_id
      day_id = dateFromServer.day_id
      time = dateFromServer.time
      day = dateFromServer.day
      day_date = dateFromServer.date
      weekday = dateFromServer.weekday
      day_type = dateFromServer.day_type
      client_name = dateFromServer.client_name
      project_name = dateFromServer.project_name
      hours = dateFromServer.hours
      notes = dateFromServer.notes
      isDayExtra = dateFromServer.isExtra
    }

    $scope.timetrack.days.push({
      "user_id": user_id,
      "day_id": day_id,
      "time": time,
      "day": day,
      "date": day_date,
      "weekday": weekday,
      "day_type": day_type,
      "client_name": client_name,
      "project_name": project_name,
      "hours": hours,
      "notes": notes,
      "isExtra": isDayExtra,
      "isFromServer": fromServer
    })
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
    var project_name = $("#project_dropdown_" + day.day_id + "  option:selected").text()
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
    var select = $("#project_dropdown_" + day.day_id)[0];
    $("#project_dropdown_" + day.day_id).html("")
    for(var i = 0; i < $scope.tmpProjects.length; i++) {
      select.add(new Option($scope.tmpProjects[i].name, i));
    }
    //$scope.setProject(day)
  }

  $scope.updateDay = function(day, field, value) {
    //console.log("===== Updating Day =======\nday: " + day.date + " - field: " + field + " - value: " + value )
    var days = $scope.timetrack.days
    $.each(days, function(){
      if(this.day_id == day.day_id) {      
        switch (field) {
          case "client_name":
            this.client_name = value  
            break
          case "project_name":
            this.project_name = value
            break
          case "day_type":
            this.day_type = value
            break
        }
      }
    })
  }

  var totalAddedDays = 0;
  $scope.addDay = function(day) {
    totalAddedDays++
    $scope.addNewDay(new Date(day.day), true, {}, false)
    setTimeout(function() { $scope.setDropDowns()}, 100)
  }

  $scope.removeDay = function(day) {
    totalAddedDays--
    $.each($scope.timetrack.days, function(i){
      if($scope.timetrack.days[i].day_id === day.day_id) {
        $scope.timetrack.days.splice(i, 1)
        return false
      }
    })
  }

  function getDateModifications() {
    var timelapse = $("#timelapse option:selected").text() || "This"
    var timeperiod = $("#timeperiod option:selected").text() || "Workday"
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
        //console.log($scope.getMonthDays(timelapse))
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
    return { "timelapse": timelapse, 
             "timeperiod": timeperiod,
             "days_to_show": daysToShow,
             "starting_at": startingAt,
             "days_modification": daysModification }
  }

  $scope.getDateFrom = function() {
    var date_specs = getDateModifications()
    var dateFrom = $scope.getFormattedDate($scope.nextDay(date_specs.days_modification, date_specs.timeperiod))
    return dateFrom
  }

  $scope.getDateTo = function() {
    var date_specs = getDateModifications()
    var dateTo = $scope.getFormattedDate($scope.nextDay(date_specs.days_modification - 1 + date_specs.days_to_show, date_specs.timeperiod))
    return dateTo
  }

  /////////////////////////////////////
  // Backend Communication Methods  ///
  /////////////////////////////////////
  $scope.getNextId = function() {
    Time.getNextId().then(function(response){
      day_id_counter = $scope.startingId = response.data.next_id
      $scope.refreshTimetrack()
      setTimeout(function() { $scope.setDropDowns()}, 100)
    }, function(response){
      $scope.messages.setCurrent("errors", response.data.errors)
    })
  }

  $scope.reloadTimetack = function() {
    $scope.refreshTimetrack()
  } 

  $scope.saveTimetrack = function() {
    Time.saveTimetrack($scope.timetrack.days).then(function(response){
      $scope.messages.setCurrent("Success", response.data.info)
    }, function(response){
      $scope.messages.setCurrent("errors", response.data.errors)
    })
  }

  $scope.getTimetrack = function() {
    var user_id   = $scope.models.user.id
    var date_from = $scope.getDateFrom()
    var date_to   = $scope.getDateTo()
    Time.getTimetrack(user_id, date_from, date_to).then(function(response){
      $scope.daysFromServer = response.data.timetrack
      $scope.getNextId()
    }, function(response){
      $scope.messages.setCurrent("errors", response.data.errors)
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
    var days = $scope.timetrack.days
    var regular_days = 0
    var extra_days = 0
    var total_days = 0
    var regular_hours = 0
    var extra_hours = 0
    var total_hours = 0

    $.each(days, function() {
      total_hours += parseInt(this.hours)
      total_days++
      if((this.isExtra == "f" || this.isExtra == false) && this.weekday != "Sat" && this.weekday != "Sun") {
        regular_hours += parseInt(this.hours)
        regular_days++
      } else {
        extra_hours += parseInt(this.hours)
        extra_days++
      }
    })
    var default_hours = parseInt(total_days*8)
    return extra_hours
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
      if(day.isExtra == true || day.isExtra == "t")
        extraDays++
    }
    return extraDays
  }


  ////////////////////////////////
  // Main  ///////////////////////
  ////////////////////////////////
  $scope.getTimetrack()

}

