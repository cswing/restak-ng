'use strict';

angular
	.module('restak')
	.directive('rtTypeAhead', ['$timeout',
		function($timeout) {

			var usageCounter = 1;  // used for unique ids

			return {
				restrict: 'E',
				scope: {
					lookupService: '=',
					model: '=',
					displayValue: '=',
					name: '@',
					titleAttr: '@',		
					idAttr: '@', 		// defaults to title attribute
					filterAttr: '@',	// defaults to title attribute
					placeholder: '@',
					editable: '='
				},
				templateUrl: 'static/ng-modules/restak/directives/type-ahead.html',
				link: function(scope, elem, attrs) {
					
					scope.idPrefix = 'rt-type-ahead-' + usageCounter++;
					scope.inputId = scope.idPrefix + 'input'; 
					scope.popupId = scope.idPrefix + 'popup'; 

					if(!scope.idAttr) {
						scope.idAttr = scope.titleAttr;
					}

					if(!scope.filterAttr) {
						scope.filterAttr = scope.titleAttr;
					}
				},
				controller: ['$scope', function(scope){

					scope.search = function(searchPhrase){
						return scope.lookupService.query({
							pageSize: 10,
							page: 1,
							filter: scope.filterAttr + '~"' + searchPhrase + '"'
						}).then(function(response){
							return response.data.payload.items;
						});
					};

					scope.onSelect = function($item, $model, $label, $event){
						scope.model = $item[scope.idAttr];
					};

					scope.$watch(
						'displayValue',
						function(newValue, oldValue) {
							if(typeof newValue == 'string') {
								scope.model = scope.editable ? newValue : null;
							}
						}
					);

					scope.onBlur = function(){
						//scope.noResults = false;
						if(!scope.editable && scope.model == null) {
							scope.displayValue = null;
						}
					};
				}]
			};
 		}
 	]);