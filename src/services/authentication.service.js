'use strict';

angular.module('restak').factory('AuthenticationService', ['$q', '$http', '$cookies',
	function($q, $http, $cookies) {

		var service= {
			cookieKey: 'restak.auth',
			headerKey: 'x-auth-token',
			currentAuth: null
		};

		var createAuthObject = function(restResponse){
			var payload = restResponse.data.payload,
				authObject = {
					token: payload.token,
					username: payload.username || 'Profile'
				};

			authObject.displayName = payload.displayName || authObject.username;

			return authObject;
		};

		var setAuthorizationResponse = function(authObject, skipSettingCookie){

			service.currentAuth = authObject;
			$http.defaults.headers.common[service.headerKey] = authObject.token;

			if(skipSettingCookie!==true) {
				$cookies.putObject(service.cookieKey, authObject, {
					// TODO Set expiration
					//expires: '"Wdy, DD Mon YYYY HH:MM:SS GMT" or a Date object'
				});
			}
		};

		var handleAuthResponse = function(response){
			setAuthorizationResponse(createAuthObject(response));
		};
		service.handleAuthResponse = handleAuthResponse;

		var signin = function(credentials){
			return $http({
				method: 'POST',
				url: 'api/security/authentication',
				data: credentials
			
			}).then(function(response){
				// Assume 200 = valid credentials
				handleAuthResponse(response);
				return response;
			});
		};
		service.signin = signin;

		var signout = function(){

			$http({
				method: 'DELETE',
				url: 'api/security/authentication'
			});//.then(function(){});

			service.currentAuth = null;
			$cookies.remove(service.cookieKey);
			delete $http.defaults.headers.common[service.headerKey];

			return $q.when(true);
		};
		service.signout = signout;

		// get token from cookie
		var authObject = $cookies.getObject(service.cookieKey);
		if(authObject){ // if(notExpired){
			setAuthorizationResponse(authObject, true);
		}

		// interceptor to handle when response id 401, clear out cookie and token

		return service;
	}
]);