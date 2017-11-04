var Channel = function(){
	this.output = AC.createGain();
	this.level  = 1;
	this.init();	
}

Channel.prototype.init = function(){
	this.output.gain.value = this.level;
}


var Mixer = function(channel){

	this.channels = [];
	for(i = 0; i < channel; i++){
		this.channels[i] = new Channel();
	}
	
}