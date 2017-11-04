// Peril.js 
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var Filter = function(type, level){
	this.type      = type;
	this.level     = level;
	this.buffer    = null;
	this.callback  = null;
	this.processor = null;
	this.output    = null;
	this.b         = [];
}

Filter.prototype.initAudio = function(){
	

}

Filter.prototype.setType = function(type){
	this.type = type;
	switch(this.type){
		case 0:
			// this.callback = this.getWhiteTick;
			break;
		case 1: 
			// this.callback = this.getPinkTick;

	}
}

Filter.prototype.process = function(event){

   
}

Filter.prototype.getLowpass = function(){
	
}

		