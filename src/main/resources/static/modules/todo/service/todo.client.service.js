angular.module('todo').factory('todoService',['$http',
    function($http){
		return{
			fetchAll:function(){
				return $http.get('api/todos').then(function(response){
					return response;
				});
			},
			createTodo : function(todo){
				return $http.post("api/todos",todo).then(function(response){
					return response;
				});
			},
			saveTodo : function(todo){
				return $http.put("api/todos/"+todo.id,todo).then(function(response){
					return response;
				});
			},
			deleteTodo : function(todo){
				return $http.delete("api/todos/"+todo.id).then(function(response){
					return response;
				});
			}
		}
	}
]);