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
		localAuthAsk:localAuthAsk
	};
function checkUser(userlogin,userpwd){
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

function localAuthAsk(login,pwd)
	{ 
		console.dir($q);
		var deferred = $q.defer();
		setInterval(function(login,pwd){
			success = true;
			error = false;
			if( success)
			{ //TODO
				var data = {}
				//remplir le container deffered avec les données recues via http.get
				deffered.resolve(data)
	
	        }
	        if(error)
	        {
	            deffered.reject('fail');
			}
			clearInterval(this); },3000,login,pwd);
	        return deffered.promise;
	    }

	return fncContainer;
}