angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope', '$log','auth'];

function loginCrtFnt($scope, $log, auth){

	$scope.checked = false;
 	
 	$scope.logAuth = function() {

 	$log.info('user login', $scope.user.login);
 	$log.info('user pwd', $scope.user.pwd);
 	
 	};

 	$scope.logAuthObject = function(user) {
		$log.info('user login',user.login);
		$log.info('user pwd',user.pwd);
		$scope.checked = true;
 	};

 	$scope.userList=function(){
		return auth.userList();
	};

	$scope.checkUser=function(user) {
		
		 var future = auth.localAuthAsk(user.login,user.pwd);
		 future.then(
		 	function(payload){
		 						//redirection suivant si future.then est admin ou watcher
		 	}
		 	function(errorPayload){
		 						//mauvaises informatiosn de login
		 	}

		 	)
	};

}