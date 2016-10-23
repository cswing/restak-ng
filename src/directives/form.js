'use strict';

angular
	.module('restak')
	.directive('rtForm', ['formUtil',
		function(formUtil) {
			return {
				restrict: 'E',
				transclude: true,
				replace: true,
				scope: {
					model: '=',
					forms: '=',
					formValidationMessages: '=',
					name: '@',
					submitLabel: '@',
					onSubmit: '&',
					onSuccess: '&',
					onCancel: '&'
				},
				templateUrl: 'static/ng-modules/restak/directives/form.html',
				controller: ['$scope', '$q', '$injector', function($scope, $q, $injector){
					
					if(!$scope.submitLabel) {
						$scope.submitLabel = 'Save';
					}

					$scope.formName = 'forms.' + $scope.name;
					
					$scope.submit = function(model){
						$scope.onSubmit({model: model})
							.then(
								function(response){
									$scope.onSuccess({response: response});
								},
								function(response){
									formUtil.handleFormErrors($scope.forms[$scope.name], response, 'topLevel');
								}
							);
					};

					//$scope.cancel = function(){};
				}]
			};
 		}
 	]);