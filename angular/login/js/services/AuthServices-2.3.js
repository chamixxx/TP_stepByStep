angular.module('authApp', []).service('auth',authFnc);
authFnc.$inject = ['$log', '$window', '$http', '$q'];

function authFnc($log,$window, $http, $q) {
	var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';

	var fncContainer={
		checkUser: checkUser,
		userList: userList,
		authAsk:authAsk
	};
	function checkUser(userlogin,userpwd) {
		for (var user in userMap) {
    		if (userlogin == user && userpwd == userMap[user]) {
    			$log.info(user);
    			$window.open("loginsuccess.html");
    			
    		}
		}	
	};

	function userList(){
		for (var user in userMap) {
    		$log.info(user);
		}	
	};

	function authAsk(login,pwd) { 
		console.dir($q);
		var deferred = $q.defer();
		$http.post('http://localhost:8080/FrontAuthWatcherWebService2/test',{'login':login,'pwd':pwd}).
			success(function(data, status, headers, config) {
			 	deferred.resolve(data)
			}).
			error(function(data, status, headers, config) {
				deferred.reject(status);
			});
        return deferred.promise;
	}
	
	return fncContainer;
}