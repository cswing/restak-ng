'use strict';

angular
	.module('restak')
	.directive('rtBlockList', [
		function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					'service': '@',
					'queryResult': '=',
					'navigate': '&',
					'itemTemplate': '@'
				},
				templateUrl: 'static/ng-modules/restak/directives/block-list.html',
				controller: ['$scope', '$injector', function($scope, $injector){

					$scope.serviceImpl = $injector.get($scope.service);
					
					var buildNavOpts = function(){
						
						var qr = $scope.queryResult;

						return {
							page: qr.page,
							pageSize: qr.pageSize,
							filter: qr.filter
						};
					};
					$scope.forms = {};
					$scope.criteria = {
						searchText: ''
					};

					$scope.onPageChange = function(page){
						var opts = buildNavOpts();
						opts.page = page;

						$scope.navigate()(opts);
					};

					$scope.search = function(c){
						var opts = buildNavOpts();
						if(c.searchText == null || c.searchText == ''){
							opts.filter = null;
						} else {
							opts.filter = 'name~"' + c.searchText + '"';
						}
						$scope.navigate()(opts);
					};

					/*
					Enable this once we have a filter parser
					$scope.$watch('queryResult', function (newValue, oldValue, $scope) {
						$scope.searchText = newValue.filter;
					});
					*/

					/*
						TODO: extract navigate, buildFilter, parseFilter into an interface 
							and pass an object implementing interface into the directive.

						TODO: Move hardcoded styles in html to its own scss file
					 */

					/*
					This doesn't pass the qresult to the paging directives
					When done in the upstream page controller, it works
					$scope.serviceImpl
						.query({pageSize: 8})
						.then(function(response){
							$scope.queryResult = response.data.payload;
						});
					*/
				}]
			};
 		}
 	]);