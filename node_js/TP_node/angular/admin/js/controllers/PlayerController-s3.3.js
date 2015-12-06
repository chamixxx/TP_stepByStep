angular.module('adminApp').controller('playerCtrl',playerCrtFnt);

playerCrtFnt.$inject=['$scope','$log','$window','comm'];

function playerCrtFnt($scope, $log, $window, comm) {
	$(".glyphicon-pause").css({color: "red"});

	var socket = $scope.socket;

	
	$scope.pause = function() {
		$(".glyphicon-pause").css({color: "red"});
        $(".glyphicon-play").css({color: "black"});
		comm.io.emitPause(socket);
	};

	$scope.end = function() {
		comm.io.emitEnd(socket);
	};

	$scope.begin = function() {
		comm.io.emitBegin(socket);
	};

	$scope.backward = function() {
		console.log("testbutton");
		comm.io.emitPrev(socket);
	};

	$scope.forward = function() {
		comm.io.emitNext(socket);
	};

	$scope.play = function() {
		$(".glyphicon-play").css({color: "red"});
        $(".glyphicon-pause").css({color: "black"});
		comm.io.emitStart(socket,$scope.currentPresenation.id);
	};
};