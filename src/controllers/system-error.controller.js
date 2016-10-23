'use strict';

angular.module('restak')
	.controller('SystemErrorController', 
		function($rootScope, $scope) {
			$scope.errors = $rootScope.systemErrors;
		}
	);