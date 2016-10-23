'use strict';

angular
	.module('restak')
	.directive('rtPaging', [
		function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					queryResult: '=',
					navigate: '&'
				},
				templateUrl: 'static/ng-modules/restak/directives/paging.html',
				controller: ['$scope', function($scope){

					var setValues = function(){
						
						$scope.x1 = -1;
						$scope.x2 = -1;
						$scope.x3 = -1;
						$scope.x4 = -1;
						$scope.x5 = -1;

						var qr = $scope.queryResult || {},
							pages = [],
							p = qr.page || 1,
							pageCount = qr.pageCount;
							
						if(p < 5) {
							var  idx = 1;
							while(idx <= 5 && idx < pageCount) {
								pages.push(idx++);
							}

						} else {
							pages.push(p);
							
							var cnt = 0;
							while(--p > 1 && cnt++ < 2){
								pages.splice(0, 0, p);
							}

							while(pages.length < 5  && pages[pages.length-1] - (qr.page || 1) < 3){
								pages.push(pages[pages.length-1] + 1);
							}
						}
						
						var pidx = 0, idx = 1;
						while (pidx < pages.length && idx <= 5) {
							var page = pages[pidx];

							if(page > 1 && page < pageCount) {
								var prop = 'x' + idx++;
								$scope[prop] = page;
							}

							pidx++;
						}
					};

					setValues();

					$scope.$watch('queryResult', function (newValue, oldValue, $scope) {
						setValues();
					});
				}]
			};
 		}
 	]);