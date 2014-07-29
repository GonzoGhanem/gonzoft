function TimeStatisticsCtrl($injector, $scope, Time, $filter) {"use strict";
  
  // $injector.invoke(TimeCtrl, this, {
  //   $scope: $scope
  // });

  console.log("asdasds")

  ////////////////////////////////
  // Statistics Methods  /////////
  ////////////////////////////////
  // $scope.getTotal = function(){
  //   var total = 0
  //   for(var i = 0; i < $scope.timetrack.days.length; i++){
  //     var day = $scope.timetrack.days[i]
  //     if(!day.deleted)
  //       total += parseInt(day.hours)
  //   }
  //   return total
  // }

  // $scope.getExtraTime = function(){
  //   var days = $scope.timetrack.days
  //   var regular_days = 0
  //   var extra_days = 0
  //   var total_days = 0
  //   var regular_hours = 0
  //   var extra_hours = 0
  //   var total_hours = 0

  //   $.each(days, function() {
  //     total_hours += parseInt(this.hours)
  //     total_days++
  //     if((this.isExtra == "f" || this.isExtra == false) && this.weekday != "Sat" && this.weekday != "Sun") {
  //       regular_hours += parseInt(this.hours)
  //       regular_days++
  //     } else {
  //       extra_hours += parseInt(this.hours)
  //       extra_days++
  //     }
  //   })
  //   var default_hours = parseInt(total_days*8)
  //   return extra_hours
  // }

  // $scope.getUncompleted = function(){
  //   var uncompletedDays = 0
  //   for(var i = 0; i < $scope.timetrack.days.length; i++){
  //     var day = $scope.timetrack.days[i]
  //     if(day.hours == 0 && day.weekday != "Sat" && day.weekday != "Sun")
  //       uncompletedDays += 1
  //   }
  //   return uncompletedDays
  // }

  // $scope.getTotalEntries = function(){
  //   return $scope.timetrack.days.length;
  // }

  // $scope.getTotalExtraEntries = function(){
  //   var extraDays = 0
  //   for(var i = 0; i < $scope.timetrack.days.length; i++){
  //     var day = $scope.timetrack.days[i]
  //     if(day.isExtra == true || day.isExtra == "t")
  //       extraDays++
  //   }
  //   return extraDays
  // }
}