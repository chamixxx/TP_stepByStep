angular.module('adminApp').controller('eventCtrl',eventCrtlFnt);

eventCrtlFnt.$inject=['$scope', '$log','factory', '$window'];

function eventCrtlFnt($scope, $log, factory, $window) {
	$log.info('controller','event');

	$scope.creatPresentation = function() {
		$scope.currentPresentation = factory.creatPresentation();
	}
}
