// Peril.js 
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var Noise = function(type, level){
	this.type      = type;
	this.level     = level;
	this.buffer    = null;
	this.callback  = null;
	this.processor = null;
	this.output    = null;
	this.b         = [];
}

Noise.prototype.init = function(){
	this.setType(this.type);
	console.log("Noise Created");
	this.b[0] = this.b[1] = this.b[2] = this.b[3] = this.b[4] = this.b[5] = this.b[6] = 0.0;
	
	this.processor = AC.createScriptProcessor(0, 0, 1);
    this.processor.onaudioprocess = this.process.bind(this);

    this.output = AC.createGain();    

	this.output.gain.value = this.level;

    this.processor.connect(this.output);
}

Noise.prototype.setType = function(type){
	this.type = type;
	switch(this.type){
		case 0:
			this.callback = this.getWhiteTick;
			break;
		case 1: 
			this.callback = this.getPinkTick;

	}
}

Noise.prototype.process = function(event){

    var outputArray = event.outputBuffer.getChannelData(0);
    var bufferSize = outputArray.length;
        
    for (i = 0; i < bufferSize; i++)
    {                
        outputArray[i] = this.callback();
    }
}

Noise.prototype.getWhiteTick = function(){
	var val = Math.random() * 2 - 1;
    return val;
}

Noise.prototype.getPinkTick = function(){
	var val;
	var white = this.getWhiteTick();
	this.b[0] = 0.99886 * this.b[0] + white * 0.0555179;
	this.b[1] = 0.99332 * this.b[1] + white * 0.0750759;
	this.b[2] = 0.96900 * this.b[2] + white * 0.1538520;
	this.b[3] = 0.86650 * this.b[3] + white * 0.3104856;
	this.b[4] = 0.55000 * this.b[4] + white * 0.5329522;
	this.b[5] = -0.7616 * this.b[5] - white * 0.0168980;
		val = (this.b[0] + this.b[1] + this.b[2] + this.b[3] + this.b[4] + this.b[5] + this.b[6] + white * 0.5362) * 0.1;
		
	this.b[6] = white;
    return val;
}




		