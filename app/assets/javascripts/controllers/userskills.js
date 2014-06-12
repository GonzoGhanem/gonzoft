function UserSkillsCtrl($scope, skills, Skill) {"use strict";
	$scope.user = $scope.models.user;
	$scope.availableSkills = skills;
	$scope.addSkill =function (){
		$scope.user.user_skills.push({id: 0, skill_id: 0, user_id: $scope.user.id, years: 0});
	}

	if ($scope.user.user_skills.length == 0)
	{
		$scope.addSkill();
	}
  	$scope.max = 6;
  	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	$scope.ratingStates = [
		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
	];

	$scope.deleteSkill = function(userSkillId) {
		if (userSkillId != 0){
			Skill.delete(userSkillId)
				.then(function(response){
					removeSkill(userSkillId);
				})
		}
	}

	$scope.updateSkills = function() {
		var i = 0;
    	for(i=0; i<$scope.user.user_skills.length; i++){
	        $scope.processing = true;

	        Skill.updateUserSkill($scope.user.user_skills[i])
	            .then(function(response) {
	            	$scope.messages.setCurrent('success', "Skill was successfully added to your account");
	                $scope.processing = false;
	            }, function(response) {
	                $scope.messages.setCurrent('errors', response.data.errors);
	                $scope.processing = false;
	            });
    	}
   
	}

	var removeSkill = function(deletedId){
		// $.each ($scope.user.user_skills, function(){
		// 	console.log(this.id);
		// 	if(this.id == deletedId){
		// 		$scope.user.user_skills.splice(i);
		// 	}
		// });
		for(var i=0; i<$scope.user.user_skills.length; i++){
			console.log(i);
			console.log($scope.user.user_skills[i].id);
			if($scope.user.user_skills[i].id == deletedId){
				console.log("IN");
				$scope.user.user_skills.splice(i,1);
			}
		}
	}

    
    
}