'use strict';

angular
	.module('restak')
	.factory('rtHttpInterceptor', function($q, $injector, $rootScope) {
		
		$rootScope.systemErrors = [];

		var interceptor = {
			responseError: function(rejection){

				if(rejection.status >= 500) {

					// Dynamically get $state to avoid circular dependency error
					var $state = $injector.get('$state');

					$rootScope.systemErrors.push({
						remoteCall: rejection,
						ngState: $state.current
					});

					$state.go('system-error');
				}

				return $q.reject(rejection);
			}
		};

		return interceptor;
	})
	.config(function($httpProvider) {  
		$httpProvider.interceptors.push('rtHttpInterceptor');
	});