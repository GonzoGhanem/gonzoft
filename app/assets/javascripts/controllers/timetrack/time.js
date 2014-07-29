////////////////////////////////
// Time Controller /////////////
////////////////////////////////
function TimeCtrl($scope, Time, $filter) {"use strict";
  
  ////////////////////////////////
  // Vars definition  ////////////
  ////////////////////////////////
  var dayNamesShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  var totalAddedDays = 0
  var day_in_milisecs = 24 * 60 * 60 * 1000
  var custom_dates = false
  var diff_in_days = 0

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
  // Datepickers Code ////////////
  ////////////////////////////////
  $scope.datepicker = {}
  $scope.datepicker.from = new Date()
  $scope.datepicker.to = new Date()

  $scope.datepicker.toggleMin = function() {
    $scope.datepicker.minDate = $scope.datepicker.minDate ? null : new Date()
  };
  
  // Add a button and call this to clear both datepickers
  $scope.datepicker.clear = function() {
    $scope.datepicker.from = null
    $scope.datepicker.to = null
  }

  $scope.datepicker.disabled = function(date, mode) {
    return
    // uncomment to disabled weekends
    //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) )
  }

  $scope.datepicker.open_from = function($event) {
    $event.preventDefault()
    $event.stopPropagation()
    $scope.datepicker.from_opened = !$scope.datepicker.from_opened
    $scope.datepicker.to_opened = false
  }

  $scope.datepicker.open_to = function($event) {
    $event.preventDefault()
    $event.stopPropagation()
    $scope.datepicker.from_opened = false
    $scope.datepicker.to_opened = !$scope.datepicker.to_opened
  }

  $scope.datepicker.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  }

  $scope.datepicker.toggleMin()
  $scope.datepicker.initDate = new Date('2016-15-20')
  $scope.datepicker.formats = ['dd/MM/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
  $scope.datepicker.format = $scope.datepicker.formats[0]

  $scope.datepickerChange = function(datepickerFrom, datepickerTo) {
    if(typeof(datepickerFrom) !== 'undefined' || 
       typeof(datepickerTo) !== 'undefined' ) {
      var diff_in_milisecs = $scope.datepicker.to - $scope.datepicker.from
      diff_in_days = Math.round(diff_in_milisecs/day_in_milisecs)+1
      
      if(diff_in_days > 100) {
        var message = "Please modify the dates, your search is too big: "+diff_in_days+" days!"
        $scope.messages.setCurrent("Errors", message)
        //$scope.messages.setCurrent("Success", message)
      } else if(diff_in_days > 0) {
        var from = $scope.getFormattedDate($scope.datepicker.from)
        var to = $scope.getFormattedDate($scope.datepicker.to)
        custom_dates = true
        $scope.getTimetrack(from, to)
        setTimeout(function() { custom_dates = false; }, 2000)
      } 
    }
  }



  ////////////////////////////////
  // Timetrack Methods  //////////
  ////////////////////////////////
  $scope.nextDay = function(x, timeperiod) {

    var dayInMilisecs = day_in_milisecs // How many milisecs are in one day
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
    $scope.refreshSavedEntries()
    $scope.refreshNewEntries()
  }

  $scope.refreshSavedEntries = function() {
    $.each($scope.daysFromServer, function(){
      var dateMatchesParams = $scope.dateMatchesParams(this)
      if(!dateMatchesParams || this.deleted) {
        return
      } else if(this.isExtra == "t" || this.isExtra) {
        $scope.addNewDay(new Date(this.day), true, this, true)
      } else {
        $scope.addNewDay(new Date(this.day), false, this, false)
      }
    })
  }

  $scope.refreshNewEntries = function() {
    var date_specs = getDateModifications()
    for (var i = 0; i < date_specs.days_to_show; i++) {
      var addDay = true
      $.each($scope.daysFromServer, function(){
        if($scope.dateMatchesParams(this)) {
          
          console.log("======= Next Day =======")
          console.log("Params: " + i+date_specs.days_modification + ", " + date_specs.timeperiod)
          console.log($scope.nextDay(i+date_specs.days_modification, date_specs.timeperiod))
          console.log("======= Current Day =======")
          console.log($scope.getFormattedDate($scope.nextDay(i+date_specs.days_modification, date_specs.timeperiod)))

          var currentDate = $scope.getFormattedDate($scope.nextDay(i+date_specs.days_modification, date_specs.timeperiod))
          if(this.date == currentDate) { 
            addDay = false
            return false
          }
        }
      })
      if(addDay)
        $scope.addNewDay($scope.nextDay(i+date_specs.days_modification, date_specs.timeperiod), false, {}, false)
    }
  }

  $scope.dateMatchesParams = function(date){
    var day_date = ($scope.formatDate(date.date)).getTime()
    var dateMatchesParams = false
    if(custom_dates) {
      var from_date = ($scope.formatDate($scope.getFormattedDate($scope.datepicker.from))).getTime()
      var to_date   = ($scope.formatDate($scope.getFormattedDate($scope.datepicker.to))).getTime()
    } else {
      var from_date = ($scope.formatDate($scope.getDateFrom())).getTime()
      var to_date   = ($scope.formatDate($scope.getDateTo())).getTime()
    }

    if( day_date >= from_date && day_date <= to_date ) 
      dateMatchesParams = true

    //console.log("Is Custom Dates: " + custom_dates)
    //console.log($scope.getFormattedDate($scope.datepicker.from), 
                 // date.date, 
                 // $scope.getFormattedDate($scope.datepicker.to),
                 // dateMatchesParams)

    //console.log(date.date, from_date/100000, day_date/100000, to_date/100000, "match: " + dateMatchesParams + " custom_dates: " + custom_dates)
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

  $scope.formatDate = function(date, set_to_eod) {
    var arr = date.split('/')
    var day = arr[0]
    var month = arr[1]-1
    var year = arr[2]
    
    var return_date = new Date(year, month, day, 0, 0, 0)
    if(set_to_eod)
      return_date = new Date(year, month, day, 23, 59, 59)

    return return_date
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
    var params = {}

    if(!fromServer) {
      params.user_id         = $scope.models.user.id
      params.day_id          = day_id_counter
      params.time            = String(date.getTime())
      params.day_with_format = date
      params.day_date        = $scope.getFormattedDate(new Date(date))
      params.weekday         = $scope.getWeekday(date)
      params.day_type        = $scope.selectedDayType.name
      params.client_name     = $scope.selectedClient.name
      params.project_name    = $scope.selectedProject.name
      params.hours           = 8
      if(params.weekday == 'Sat' || params.weekday == 'Sun' || is_extra) {
        params.hours         = 0
        params.day_type      = "Overtime"
      }
      params.notes           = ""        
      params.isDayExtra      = is_extra
      day_id_counter++
    } else {
      params.user_id         = day.user_id
      params.day_id          = day.day_id
      params.time            = day.time
      params.day_with_format = day.day
      params.day_date        = day.date
      params.weekday         = day.weekday
      params.day_type        = day.day_type
      params.client_name     = day.client_name
      params.project_name    = day.project_name
      params.hours           = day.hours
      params.notes           = day.notes
      params.isDayExtra      = day.isExtra
      params.created_at      = day.created_at
    }
    params.fromServer        = fromServer
    $scope.createTimetrackEntry(params)
  }

  $scope.createTimetrackEntry = function(params) {
    console.log(params)
    $scope.timetrack.days.push({
      "user_id":      params.user_id,
      "day_id":       params.day_id,
      "time":         params.time,
      "day":          params.day_with_format,
      "date":         params.day_date,
      "weekday":      params.weekday,
      "day_type":     params.day_type,
      "client_name":  params.client_name,
      "project_name": params.project_name,
      "hours":        params.hours,
      "notes":        params.notes,
      "isExtra":      params.isDayExtra,
      "isFromServer": params.fromServer,
      "created_at":   params.created_at,
      "deleted":      false
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

  function getDateModifications() {
    var timelapse = $("#timelapse option:selected").text() || "This"
    var timeperiod = $("#timeperiod option:selected").text() || "Workday"
    var daysToShow = 0
    var startingAt = 0
    var daysModification = 0
    
    if(custom_dates) {
      console.log("================ custom dates =============")

      var today = new Date()
      var start_to_end = Math.round(($scope.datepicker.to - $scope.datepicker.from)/day_in_milisecs)
      var from_to_today = Math.round(($scope.datepicker.from - today)/day_in_milisecs)

      daysToShow = start_to_end
      daysModification = from_to_today 

      console.log("from: " + $scope.datepicker.from)
      console.log("to: " + $scope.datepicker.to) 
      // console.log("diff_in_milisecs: " + diff_in_milisecs)
      // console.log("diff_in_days: " + diff_in_days)
      // console.log("starting_at: " + startingAt)
      console.log("daysToShow: " + daysToShow)
      console.log("daysModification: " + daysModification)


    } else {
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
    }
    return { "timelapse": timelapse, 
             "timeperiod": timeperiod,
             "days_to_show": daysToShow,
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


  ////////////////////////////
  // UI based actions ////////
  ////////////////////////////  
  $scope.addDay = function(day) {
    totalAddedDays++
    $scope.addNewDay(new Date(day.day), true, {}, false)
    setTimeout(function() { $scope.setDropDowns()}, 100)
  }

  $scope.removeDay = function(day) {
    totalAddedDays--

    if(day.isFromServer) {
      $.each($scope.timetrack.days, function(i) {
        if(this.day_id == day.day_id) {
          this.deleted = true
          $("#daytype_dropdown_"+day.day_id).closest(".row_day").hide()
          return false
        }
      })
    } else {
      $.each($scope.timetrack.days, function(i){
        if($scope.timetrack.days[i].day_id === day.day_id) {
          $scope.timetrack.days.splice(i, 1)
          return false
        }
      })
    }
  }

  $scope.setClientProjects = function(day, selectedClient) {
    $scope.tmpProjects = []
    $scope.updateDay(day, "client_name", selectedClient.name)    
    for( var i = 0; i < $scope.AllProjects.length; i++ ) {
      if($scope.AllProjects[i].client_id == $scope.getClientIdByClientName(day.client_name) ) 
        $scope.tmpProjects.push($scope.AllProjects[i])
    }
    $scope.selectedProject = $scope.projects[0]
    var select = $("#project_dropdown_" + day.day_id)[0];
    $("#project_dropdown_" + day.day_id).html("")
    for(var i = 0; i < $scope.tmpProjects.length; i++) {
      select.add(new Option($scope.tmpProjects[i].name, i));
    }
  }

  $scope.setDayType = function(day, selectedDayType) {
    $scope.updateDay(day, "day_type", selectedDayType.name)
  }

  $scope.setProject = function(day) {
    var project_name = $("#project_dropdown_" + day.day_id + "  option:selected").text()
    $scope.updateDay(day, "project_name", project_name)
    //console.log("$scope.updateDay(" + day +" , project_name, " + project_name +")")
  }

  $scope.showAddedInfo = function(day) {
   

      // setTimeout(function(){
      // console.log(day)

      var date = new Date(day.created_at)
      var htmlTooltip = 'This entry was brought from DB!<br/>'
      htmlTooltip += '_____________________<br>'
      htmlTooltip += 'Saved on: <b>'+$scope.getFormattedDate(date)+'</b><br>'
      htmlTooltip += 'Id: <b>'+day.day_id+'</b><br>'
      htmlTooltip += 'Type: <b>'+day.day_type+'</b><br/>'
      htmlTooltip += 'Client: <b>'+day.client_name+'</b><br/>'
      htmlTooltip += 'Project: <b>'+day.project_name+'</b><br/>'
      htmlTooltip += 'Hours: <b>'+day.hours+'</b><br>'
      htmlTooltip += 'Notes: <b>'+day.notes+'</b>'
      $scope.htmlTooltip = htmlTooltip
    //}, 10)
  }

  $scope.refreshDay = function(day) {
    //console.log("Refresh: " + day.date)
  }

  $scope.replicateDay = function(day) {
    //console.log("Replicate: " + day.date)
  }


  /////////////////////////////////////
  // Backend Communication Methods  ///
  /////////////////////////////////////
  $scope.getNextId = function() {
    Time.getNextId().then(function(response){
      day_id_counter = $scope.startingId = response.data.next_id
      $scope.refreshTimetrack()
      setTimeout(function() { $scope.setDropDowns()}, 100)
      setTimeout(function() {
        $.each($scope.timetrack.days, function(){
          $scope.setProject(this)
        })
      }, 200)
    }, function(response){
      $scope.messages.setCurrent("errors", response.data.errors)
    })
  }

  $scope.reloadTimetack = function() {
    $scope.refreshTimetrack()
  } 

  $scope.saveTimetrack = function() {
    Time.saveTimetrack($scope.timetrack.days).then(function(response){
      setTimeout(function(){ $scope.getTimetrack(); }, 500)
      $scope.messages.setCurrent("Success", response.data.info)
    }, function(response){
      $scope.messages.setCurrent("errors", response.data.errors)
    })
  }

  $scope.getTimetrack = function(from, to)  {
    
    if(from != null && to !=null)
      console.log(from, to)

    var user_id   = $scope.models.user.id
    var date_from = from || $scope.getDateFrom()
    var date_to   = to || $scope.getDateTo()

    date_from = $scope.formatDate(date_from, false).getTime()
    date_to = $scope.formatDate(date_to, true).getTime()


    //console.log("===== getTimetrack ===== " + date_from + " - " + date_to)

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
      if(!day.deleted)
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
