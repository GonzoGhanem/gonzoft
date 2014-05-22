function SkillsCtrl($scope, skills) {"use strict";
	
	$scope.skills = skills;

	$scope.edit = function(skill){
		console.log("You edited " + skill.name);
	}

	$scope.delete = function(skill){
		console.log("You just deleted " + skill.name);
	}
}