angular.module('commServicesWatcher', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q'];

function commFnc($http,$q) {
     var comm = {
         loadImages:       loadImages,
         loadPres:          loadPres,
         savePres:      savePres
         
     };
   
	function loadImages() { 
		var deferred = $q.defer(); 
		$http.get('/slidRouter/slids').
			success(function(data, status, headers, config) {
			deferred.resolve(data); 
		}).
		error(function(data, status, headers, config) { 
			deferred.reject(status);
	        $log.error('failure loading content', errorPayload);
		});
		return deferred.promise; 
	};

	function loadPres(presName,presID) { 
		var deferred = $q.defer(); 
		$http.get('/loadPres').
			success(function(data, status, headers, config) { 
			deferred.resolve(data);
		}).
		error(function(data, status, headers, config) {
			deferred.reject(status);
	        // or server returns response with an error status.
		});
		return deferred.promise; 
	};

	function savePres(currentPres){
		var deferred = $q.defer(); 
		console.dir(currentPres);
		$http.post('/savePres',currentPres).
			success(function(data, status, headers, config) { 
			deferred.resolve(data);
		}).
		error(function(data, status, headers, config) {
			deferred.reject(status);
	        // or server returns response with an error status.
		});
		return deferred.promise; 
	};

	// Order for watcher clients
	comm.io={}; 
	comm.io.socketConnection = function(scope,uuid) {
		var socket = io.connect();
		
		comm.io.uuid=uuid; 
		socket.on('connection', function () {
			socket.emit('data_comm',{'id':comm.io.uuid}); 
		});
		
		socket.on('newPres', function (socket) { 
		});
		
		socket.on('slidEvent', function (slid) {
			console.log(slid);
			scope.selectCurrentSlid(slid);
			scope.$apply();
		});
		
		return socket; 
	}

	comm.io.emitPrev = function(socket) { 
		socket.emit('slidEvent', {'CMD':"PREV"});
	}

	comm.io.emitStart = function(socket,presUUID) {
		socket.emit('slidEvent', {'CMD':"START",'PRES_ID':presUUID}); 
	}

	comm.io.emitPause = function(socket) { 
		socket.emit('slidEvent', {'CMD':"PAUSE"});
	} 

	comm.io.emitBegin = function(socket) {
		socket.emit('slidEvent', {'CMD':"BEGIN"}); 
	}

	comm.io.emitNext = function(socket) { 
		socket.emit('slidEvent', {'CMD':"NEXT"});
	}

	comm.io.emitEnd = function(socket) { 
		socket.emit('slidEvent', {'CMD':"END"});
	}

	return comm;
};
    