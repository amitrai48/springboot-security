angular.module(ApplicationConfiguration.applicationModuleName,ApplicationConfiguration.applicationModuleVendorDependencies);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider','$urlRouterProvider','$httpProvider',
    function($stateProvider,$urlRouterProvider,$httpProvider){
		$httpProvider.interceptors.push('authInterceptor');
		$urlRouterProvider.otherwise('/login');
		
		$stateProvider
		.state('register',{
			'url':'/register',
			'views':{
				'main':{
					'templateUrl':'/modules/user/views/register.view.tpl.html',
					'controller':'registerController'
				},
				'header':{
					'templateUrl':'/modules/common/views/header.unauthorised.view.tpl.html'
				},
				'footer':{
					'templateUrl':'/modules/common/views/footer.view.tpl.html'
				}
			},
			'data':{
				'requiresLogin':false
			}
		})
		.state('login',{
			'url':'/login',
			'views':{
				'main':{
					'templateUrl':'/modules/user/views/login.view.tpl.html',
					'controller':'loginController'
				},
				'header':{
					'templateUrl':'/modules/common/views/header.unauthorised.view.tpl.html'
				},
				'footer':{
					'templateUrl':'/modules/common/views/footer.view.tpl.html'
				}
			},
			'data':{
				'requiresLogin':false
			}
		})
		.state('todo',{
			'url':'/todos',
			'views':{
				'main':{
					'templateUrl':'/modules/todo/views/todo.view.tpl.html',
					'controller':'todoController'
				},
				'header':{
					'templateUrl':'/modules/common/views/header.authorised.view.tpl.html',
					'controller':'headerController'
				},
				'footer':{
					'templateUrl':'/modules/common/views/footer.view.tpl.html'
				}
			},
			'data':{
				'requiresLogin':true
			}
		})
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope','$state','Authentication',
    function($rootScope,$state,Authentication){
		$rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
			Authentication.me().then(function(response){
				console.log(toState);
				var requiresLogin = toState.data.requiresLogin;
				var isAuthenticated = Authentication.isAuthenticated();
				console.log(requiresLogin);
				console.log(isAuthenticated);
				if(requiresLogin && !isAuthenticated){
					event.preventDefault();
					$state.go('login');
				}
				if(!requiresLogin && isAuthenticated){
					console.log("called");
					event.preventDefault();
					$state.go('todo');
				}
			});
		});
	}
]);


angular.element(document).ready(function(){
	angular.bootstrap(document,[ApplicationConfiguration.applicationModuleName]);
});