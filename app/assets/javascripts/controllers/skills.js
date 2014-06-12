function SkillsCtrl($scope, skills, Skill) {"use strict";
	
	$scope.skills = skills;

	$scope.addNew = function(){
		$scope.newSkill = {};
		$scope.addingNew = true;
	}

	$scope.saveNewSkill = function(){
		Skill.insertSkill($scope.newSkill).then(function(response){
			$scope.addingNew = false;
			$scope.messages.setCurrent('success', "Skill " + $scope.newSkill.name + " added!!");
			$scope.skills.push($scope.newSkill);
		}, function(response){
			$scope.messages.setCurrent('errors', response.data.errors);
		});
	}

	$scope.cancelNewSkill = function(){
		$scope.addingNew = false;	
	}	

	$scope.edit = function(skill){
		console.log("You edited " + skill.name);
	}

	$scope.delete = function(skill){
		if(skill.user_count > 0) {
			$scope.messages.setCurrent('warnings', "Couldn't remove " + skill.name + " skill since it's used by users!!");
		}
		else{
			Skill.deleteSkill(skill).then(function(response){
				$scope.messages.setCurrent('success', "Removed " + skill.name +" skill!!");
				removeSkill(skill);
			}, function(response){
				$scope.messages.setCurrent('error', "Couldn't remove " + skill.name + " skill!!");
			});
		}
	}

	function removeSkill(skill){
		for (var i = 0; i < $scope.skills.length; i++){
			if ($scope.skills[i].id == skill.id){
				$scope.skills.splice(i, 1);
			}
		} 
	}
}