function SkillsCtrl($scope, skills, Skill) {"use strict";
	
	$scope.skills = skills;

	$scope.addNew = function(){
		$scope.newSkill = {};
		$scope.addingNew = true;
	}

	$scope.saveNewSkill = function(){
		Skill.insertSkill($scope.newSkill).then(function(response){
			$scope.addingNew = false;
			$scope.messages.setCurrent('success', "New Skill added!!");
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
		console.log("You just deleted " + skill.name);
	}
}