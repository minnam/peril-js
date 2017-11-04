var Peril = Peril || {};

Peril.namespace = function (ns_string){
	
	var parts = ns_string.split('.');
	parent = Peril;

	if (parts[0] === "Peril"){
		parts = parts.slice(1);
	}

	for(i = 0; i < parts.length; i++){
		if ( typeof parent[parts[i]] === "undefined"){
			parent[parts[i]] = {};
		}

		parent = parent[parts[i]];
	}

	return parent;
}

var modules2 = Peril.namespace('modules.hello');


function _setOutput(target, args){
	for(i = 0; i < args.length; i++){
		target.output.connect(args[i]);		
	}
}

function _createAttribute(target, args){
	for(i = 1; i < arguments.length; i++){
		target.createAttribute(args);
	}
	
}

function _toString(target){
	for(var i in target){
		if(target.hasOwnProperty(i)){
			console.log(i, ":", target[i])
		}	
	}	
}

var AudioClass = function(){
	this.input  = null;
	this.output = null;
}

AudioClass.prototype.setOutput = function(args){
	for(i = 0; i < args.length; i++){
		this.output.connect(args[i]);		
	}
}

var testClass = function(){
	this.test1 = "hello";
	console.log(this);

}

var testClass2 = function(){
	this.test1 = "hello";
	

}

var testClass2 = function(){
	this.prototype = new testClass();
	console.log(this.prototype.test1);
}

var test1 = new testClass2();

// _createAttribute(test1)