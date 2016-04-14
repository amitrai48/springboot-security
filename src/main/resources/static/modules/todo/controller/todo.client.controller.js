angular.module('todo').controller('todoController',['$scope','todoService',
    function($scope,todoService){
		$scope.newTodo = {};
		$scope.editedTodo = {};
		$scope.fetchAll = function(){
			todoService.fetchAll().then(function(response){
				$scope.todos = response.data;
			});
		}
		
		$scope.fetchAll();
	
		$scope.createTodo = function(){
			console.log($scope.newTodo);
			todoService.createTodo($scope.newTodo).then(function(response){
				$scope.newTodo = {};
				$scope.fetchAll();
			});
		}
		
		$scope.editTodo = function(todo){
			$scope.editedTodo = todo;
		}
		
		$scope.saveTodo = function(todo){
			todoService.saveTodo(todo).then(function(response){
				angular.forEach($scope.todos,function(singleTodo,index){
					if(singleTodo.id === todo.id){
						$scope.todos[index] = response.data;
					}
				});
				
				if($scope.editedTodo && $scope.editedTodo.id === todo.id){
					$scope.editedTodo = {};
				}
			});
		}
		
		$scope.deleteTodo = function(todo){
			todoService.deleteTodo(todo).then(function(response){
				angular.forEach($scope.todos,function(singleTodo,index){
					if(singleTodo.id === todo.id){
						$scope.todos.splice(index,1);
					}
				});
			});
		}
	}
]);