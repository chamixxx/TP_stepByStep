angular.module('authApp', []).service('auth',authFnc);
authFnc.$inject = ['$log'];

function authFnc($log) {
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