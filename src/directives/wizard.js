'use strict';

angular
	.module('restak')
	.directive('rtWizard', ['formUtil',
		function(formUtil) {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					forms: '=',
					formValidationMessages: '=',
					wizardPages: '=',
					name: '@',
					//onPageChanging: '&',
					onPageChanged: '&'
				},
				templateUrl: 'static/ng-modules/restak/directives/wizard.html',
				controller: ['$scope', '$q', '$injector', function($scope, $q, $injector){
					
					if(!$scope.nextLabel) {
						$scope.nextLabel = 'Next';
					}

					$scope.formName = 'forms.' + $scope.name;

					$scope.hasNext = false;
					$scope.hasPrevious = false;
					$scope.canFinish = false;

					var setCurrentPage = function(idx) {
						if(idx < 0 || idx > $scope.wizardPages.length)
							idx = 0;

						var currentPage = $scope.wizardPages[idx];
						if(!currentPage)
							return;

						$scope.currentPage = currentPage;
						$scope.pageModel = currentPage.model;
						$scope.currentPageIdx = idx;
						$scope.hasNext = idx < ($scope.wizardPages.length - 1);
						$scope.hasPrevious = idx > 0;
						$scope.canFinish = idx == ($scope.wizardPages.length - 1);

						$scope.onPageChanged({page: $scope.currentPage});
					};
					
					$scope.$watch('wizardPages', function(){ setCurrentPage(0); });
					if(!$scope.currentPage){ setCurrentPage(0); }
					
					$scope.onPrevious = function(){
						//$scope.onPageChanging({page: $scope.currentPage});
						setCurrentPage($scope.currentPageIdx - 1);
					};

					$scope.onNext = function(){
						//$scope.onPageChanging({page: $scope.currentPage});
						setCurrentPage($scope.currentPageIdx + 1);
					};

					$scope.onFinish = function(){

					};

					//$scope.cancel = function(){};
				}]
			};
 		}
 	]);