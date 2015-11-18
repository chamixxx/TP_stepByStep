angular.module('adminApp').controller('playerCtrl',playerCrtFnt);

playerCrtFnt.$inject=['$scope','$log','$window','comm'];

function playerCrtFnt($scope, $log, $window, comm) {

	var uuid = $scope.currentPresenation.id;
	//var socket = comm.io.socketConnection($scope,$scope.currentPresenation.id);
	console.log(uuid);

	
	$scope.pause = function() {
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
		comm.io.emitStart(socket,uuid);
	};
};