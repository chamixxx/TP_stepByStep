angular.module('authApp', []).service('auth',authFnc);
authFnc.$inject = ['$log', '$window'];

function authFnc($log,$window) {
	var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';

	var fncContainer={
		checkUser: checkUser,
		userList: userList
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
	return fncContainer;
}