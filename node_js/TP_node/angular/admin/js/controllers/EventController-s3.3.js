angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','factory','comm'];

function eventCrtFnt($scope, $log, $window, factory, comm){
       
    
    $scope.currentPresenation=factory.presentationCreation("template_pres","description of the template présentation");
    
   //CREATE an object for interactions with ng-include controller
    $scope.contentMap={};
    $scope.contentMap.payload="";
    
    $scope.presentationMap={};
    $scope.presentationMap.payload="";

    $scope.isDropZoneShown = false;

    $scope.dropZoneButton = "Montrer DropeZone";

    //$scope.socket = comm.io.socketConnection($scope, factory.generateUUID());

    
    var available_content=comm.loadImages();
       available_content.then(
          function(payload) { 
              $scope.contentMap.payload = payload;
              $scope.contentMap.array=factory.mapToArray(payload);
          },
          function(errorPayload) {
              $log.error('failure loading movie', errorPayload);
          });
    
    var firstPresentation = comm.loadPres('test','test');
       firstPresentation.then(
          function(payload) { 
              $scope.presentationMap.payload = payload;
              $scope.presentationMap.array = factory.mapToArray(payload);
                            
              for(key in $scope.presentationMap.payload){
                  $scope.currentPresenation = $scope.presentationMap.payload[key];
                  console.log( $scope.currentPresenation );
                  $scope.currentSlide = $scope.currentPresenation.slidArray[0];              
                }
             
          },
          function(errorPayload) {
              $log.error('failure loading movie', errorPayload);
          });
    
    
    $scope.newSlide = function(){
        var slid=factory.slidCreation("slide-Title","slide-text");
        $scope.currentPresenation.slidArray.push(slid);
        $scope.currentSlide = slid; 
    }

    $scope.newPresentation = function() {
        console.log("title per default");
        var title = "My presentation";        
        $scope.currentPresenation = factory.presentationCreation(title,"my fisrt presentation",$scope.currentPresenation.id);
        $scope.newSlide();
    }
    
    $scope.savePres=function(){
        var data = comm.savePres($scope.currentPresenation);
        data.then (
        function(payload) {
          $window.alert('Status: well saved ' + payload);
        },
        function(errorPayload) {
          $window.alert('Status: not saved ' + data);
        });
    }
    
    $scope.selectCurrentSlid=function(slide){
        $scope.currentSlide=slide; 
    }
    
    
    $scope.onDragComplete=function(data,evt){
       console.log("drag success, data:", data);
    }
    
    
    $scope.onDropComplete=function(data,evt){
        if($scope.currentSlide != undefined){
            $scope.currentSlide.contentMap[1]=data.id;
            //needed to inform angular that a change occurred on the current variable, this fire an event change
            $scope.$apply()
            console.log("drop success, data:", data);
            }
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

    $scope.showDropZone = function() {
      if ($scope.isDropZoneShown == false) {
        $scope.isDropZoneShown = true;
         $scope.dropZoneButton = "Cacher DropeZone";
      }
      else {
        $scope.isDropZoneShown = false;
         $scope.dropZoneButton = "Montrer DropeZone";
      }
    }  

    $scope.deleteSlide = function() {
      var index = $scope.currentPresenation.slidArray.indexOf($scope.currentSlide);
      console.log(index);
      $scope.currentPresenation.slidArray.splice(index,1);
    }
};
