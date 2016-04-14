angular.module('user').factory('userService',['$http',
    function($http){
		return{
			loginUser:function(user){
				return $http({
					method:'POST',
					url:'/login',
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					transformRequest : function(obj){
						var str = [];
						for(var p in obj)
							str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
						return str.join("&");
					},
					data:{username:user.username,password:user.password,submit:'Login'}
				}).then(function(response){
					return response;
				});
			},
			logout:function(){
				return $http.post("/logout",{}).then(function(response){
					return response;
				});
			},
			register:function(user){
				return $http.post("/api/user/register",user)
				.then(function(response){
					return response;
				});
			}
		}
	}
]);