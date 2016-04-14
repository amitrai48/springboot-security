angular.module('core').factory('authInterceptor',['$q','$injector',
    function($q,$injector){
		return{
			responseError: function(rejection){
				if(rejection.status == 401){
					$injector.get('Authentication').currentUser = null;
				}
				return $q.reject(rejection);
			}
		}
	}
]);