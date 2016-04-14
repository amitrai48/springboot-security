angular.module('user').controller('loginController',['$scope','$state','userService',
    function($scope,$state,userService){
		$scope.user = {};
		$scope.error = {};
		$scope.loginUser = function(){
			userService.loginUser($scope.user)
			.then(function(response){
				$state.go('todo');
			},function(err){
				$scope.error.hasError = true;
				if(err.status == 401){
					$scope.error.message = "Invalid Credentials";
				}
				else{
					$scope.error.message = "Something went wrong! Please try again later."
				}
			});
		}
	}
]);