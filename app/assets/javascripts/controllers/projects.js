function ProjectCtrl($scope, Project, client, projects, positions, users) {"use strict";
	
	var createProject = function(){
		$scope.newproject = {};
		$scope.newproject.client_id = $scope.client.id;
		$scope.newproject.open_positions = [];
	};

	$scope.availablePositions = positions;
	$scope.availableUsers = users;
	$scope.saving = false;
	$scope.client = client;
	$scope.client.projects = projects;
	angular.forEach($scope.client.projects, function(value){
		debugger;
	});
	createProject();

	$scope.saveProject = function(){
		$scope.saving = true;
		Project.create($scope.newproject)
			.then(function(response){
				$scope.saving = false;
				$scope.messages.setCurrent("sucess", "Project " + $scope.newproject.name +" added successfully");
				$scope.client.projects.push(response);
				createProject();
			})
	}

	$('#projectTabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$scope.showContent = function(id){
		$('#content-' + id).slideToggle('slow');
	};


	$scope.addOpenPosition = function(){
		$scope.newproject.open_positions.push({project_id: $scope.newproject.project_id, user_id: "", position_id: "", start_date: "", end_date: ""})
	}

}