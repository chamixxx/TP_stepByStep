angular.module('watchApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','factory','comm'];

function eventCrtFnt($scope, $log, factory, comm){

    $scope.isPresentaionStarted = true;
       
    
    $scope.currentPresenation=factory.presentationCreation("template_pres","description of the template présentation");
    
   //CREATE an object for interactions with ng-include controller
    $scope.contentMap={};
    $scope.contentMap.payload="";
   
    $scope.socket = comm.io.socketConnection($scope, factory.generateUUID());

    
    var available_content=comm.loadImages();
       available_content.then(
          function(payload) { 
              $scope.contentMap.payload = payload;
              $scope.contentMap.array=factory.mapToArray(payload);
          },
          function(errorPayload) {
              $log.error('failure loading movie', errorPayload);
          });
    
    $scope.selectCurrentSlid=function(slide){
        $scope.isPresentaionStarted = false;
        $scope.currentSlide=slide; 
    }
    $scope.getCurrentContent=function(){
        if(1  in  $scope.currentSlide.contentMap){
            return $scope.currentSlide.contentMap[1];
        }
    }
    
    $scope.isSlidContentEmpty=function(slid){
        if(slid == undefined) return false;
        return slid.contentMap[1]== undefined;
    }      
};
