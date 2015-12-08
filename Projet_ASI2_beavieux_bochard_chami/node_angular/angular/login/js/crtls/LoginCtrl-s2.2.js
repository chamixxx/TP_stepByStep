angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope', '$log','auth', '$window'];

function loginCrtFnt($scope, $log, auth, $window){

	$scope.usercheck = false;
 	
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
		
		 var future = auth.authAsk(user.login,user.pwd);
		 future.then(
		 	function(payload) {
		 		$log.info('payload',payload);	
		 		if (payload.validAuth) {
		 			$scope.usercheck = false;

		 			if (payload.role == "ADMIN") {
		 				$window.location.assign("/admin");
		 			}
		 			if (payload.role == "WATCHER") {
		 				$window.location.assign("/watch");
		 			}
		 		}
		 		else {
		 			$scope.usercheck = true;
		 			$log.info('user login',"wrong combination user pwd" );
		 		}			
		 	},
		 	function(errorPayload){
		 		$log.info('errorPayload',errorPayload)				
		 	}
		);
	};

}