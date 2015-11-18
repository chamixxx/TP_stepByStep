angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q'];

function commFnc($http,$q){
     var comm = {
         loadImages:       loadImages,
         loadPres:          loadPres,
         savePres:      savePres
         
     };
   
function loadImages(presName,presID){ 
	var contentMap = {};
	var deferred = $q.defer();
	for (var i=0; i<12; i++) {
		var title = "image"+i;
		var type = "IMG_URL";
		var src = "img/"+i+".jpg";
		var content={};
        content.id=i;
        content.title=title;
        content.src=src;
        content.type=type;
		contentMap[i] = content;
	}
	deferred.resolve(contentMap);
	
	return deferred.promise;
};
function loadPres(presName,presID){
	var deferred = $q.defer();
	deferred.reject("NULL");
	return deferred.promise;
};
function savePres(presName,presID){
	// TODO
};
return comm;
   
};
    