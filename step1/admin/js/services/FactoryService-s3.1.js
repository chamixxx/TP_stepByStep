var contentType={}
	contentType.IMG_URL="IMG_URL"; 
	contentType.IMG_B64="IMG_B64";

angular.module('factApp', []).factory('factory',factoryFnc);

function factoryFnc() { 
	var factory = {
		generateUUID: generateUUID,
		contentCreation: contentCreation,
		slidCreation: slidCreation, 
		presentationCreation: presentationCreation, 
		mapToArray: mapToArray
	};
	
	// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	function generateUUID() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid; 
	};

	function contentCreation(title,type,src) { 
		var content = {
			"id":1,
			"title" : title,
			"type" : type,
			"src" : src
		};
		return content;
	};

	function slidCreation(title,txt) {
		var content = contentCreation("test1",contentType.IMG_URL,"URL");
		var contentMap = {};
		contentMap['1'] = content;
 
		var slide = {
			"id":1,
			"title" : title,
			"text" : txt,
			"contentMap" : contentMap
		}
		return slide;
	};

	function presentationCreation(title,description) {
		var slideArray = [];
		var presentaion = {
			"id":1,
			"title" : title,
			"description" : description,
			"slideArray" : slideArray
		};
		return presentaion;
	};

	function mapToArray(map) { 
		contentArray=[]; for(key in map) {
			contentArray.push(map[key]); 
		}
		return contentArray; 
	};

	return factory; 
};