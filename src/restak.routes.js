'use strict';

angular
	.module('restak')
	.config(function($stateProvider) {
		$stateProvider
			.state('system-error', {
				url: '/system-error',
				templateUrl: 'static/ng-modules/restak/views/system-error.view.html',
				controller:  	'SystemErrorController'
			});
	});