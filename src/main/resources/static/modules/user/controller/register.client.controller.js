angular.module('user').controller('registerController',['$scope','$state','userService',
    function($scope,$state,userService){
		$scope.user = {};
		$scope.error = {};
		
		$scope.registerUser = function(){
			userService.register($scope.user)
			.then(function(response){
				$state.go('todo');
			},function(err){
				console.log(err);
				$scope.error.hasError = true;
				$scope.error.message = "Something wnet wrong. Please Try again Later!"
			});
		}
	}
]);