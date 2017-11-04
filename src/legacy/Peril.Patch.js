// Peril.js 
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var Patch = function(patch){
	this.parameters = this.getParameters(patch);
	for( i = 0; i < this.parameters.length; i++){
		this[this.parameters[i]] = 0;
		this["set"+ (this.parameters[i]).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})] = function(){
		}		
	}
	
}

Patch.prototype.getParameters = function(func){
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	var ARGUMENT_NAMES = /([^\s,]+)/g;
	var fnStr = func.toString().replace(STRIP_COMMENTS, '');

	var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	var result2 = fnStr.slice(fnStr.indexOf('{')+1, fnStr.indexOf('}'));
	var result3 = result2.split("\n");
	for(i = 0; i < result3.length; i++){
		if(result3[i].length > 0){
			
			var re = /.*var\s+(.*)\s+=.*/;
    		var variable = result3[i].replace(re, "$1").replace(/\s/g, '');;

    		var re2 = /.*=\s+(.*)/;
    		var toExecute = result3[i].replace(re2, "$1")

    		this[variable] = eval(toExecute);
		}
	}
	
	if(result == null)
		result = [];
	return result;
}

var patch1 = new Patch(function(frequency, level, fm, am){
	var osc1 = new Oscillator();
	var osc2 = new Oscillator();
})
