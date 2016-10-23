'use strict';

angular
	.module('restak')
	.directive('rtFormField', [
		function() {
			return {
				restrict: 'E',
				transclude: true,
				replace: true,
				scope: {
					field: '='
				},
				templateUrl: 'static/ng-modules/restak/directives/form-field.html',
				controller: ['$scope', function($scope){

					$scope.getForm = function(){
						
						if($scope.form)
							return $scope.form;

						// ASSUMPTIONS: the page controller scope has a forms object
						//  that has one key that is the FormController
						var forms = null,
							scope = $scope;
						
						while(!forms && scope){
							forms = scope.forms;
							scope = scope.$parent;
						};
						
						if(forms) {
							var keys = Object.keys(forms);
							if(keys.length > 0) {
								$scope.form = forms[keys[0]];
							}	
						}

						return $scope.form;
					};

					$scope.hasFieldError = function(key){

						var form = $scope.getForm();
						if(!form) return true;

						var field = $scope.field || {},
							fieldController = form[field.name];

						if(!fieldController)
							return false;

						if(key)
							return fieldController.$error[key];

						return fieldController.$invalid;
					};
				}]
			};
 		}
 	]);