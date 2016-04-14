angular.module('user').factory('Authentication',['$http','$q',
    function($http,$q){
		var self = {
			currentUser:null,
			me:function(){
				if(!self.isAuthenticated()){
					var deferred = $q.defer();
					return $http.get("/api/user/me")
					.then(function(response){
						self.currentUser = response.data;
						deferred.resolve(self.currentUser);
					},function(err){
						self.currentUser = null;
						deferred.resolve({authenticated:false});
					});
					return deffered.promise;
				}
				else{
					return $q.when(self.currentUser)
				}
			},
			isAuthenticated:function(){
				return !!self.currentUser;
			}
		};
		return self;
	}
]);