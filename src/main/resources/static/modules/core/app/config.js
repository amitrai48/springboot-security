var ApplicationConfiguration = (function(){
	var applicationModuleName = "todoApp";
	var applicationModuleVendorDependencies = ['ui.router','ui.bootstrap'];
	var registerModule = function(moduleName,dependencies){
		angular.module(moduleName, dependencies || []);
	    angular.module(applicationModuleName).requires.push(moduleName);
	}
	
	return{
		applicationModuleName : applicationModuleName,
		applicationModuleVendorDependencies : applicationModuleVendorDependencies,
		registerModule : registerModule
	}
})();