angular.module('adminApp').controller('eventCtrl',eventCrtlFnt);

eventCrtlFnt.$inject=['$scope', '$log','factory', '$window'];

function eventCrtlFnt($scope, $log, factory, $window) {
	$log.info('controller','event');

	
	$scope.newSlide = function() {
		var slideInfo = {
			"title":"testSlide",
			"text":"testTxt"
		};
		var slide = factory.slidCreation(slideInfo.title,slideInfo.text);
		$scope.currentPresentation.slideArray.push(slide);
		console.dir($scope.currentPresentation);
	};
		

	$scope.creatPresentation = function(pres) {
		$scope.currentPresentation = factory.presentationCreation(pres.title,"");
		console.dir($scope.currentPresentation);
	};

	$scope.selectCurrentSlid=function(slide) {
		$scope.currentSlide=slide; 
	}

	$scope.isSlidContentEmpty=function(slide) { 
		if(slide.contentMap[1]== undefined) {
        	return true;
    	}
		return false;
	}


}
