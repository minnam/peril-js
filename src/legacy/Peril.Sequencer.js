var Clock = function(rate, size, sequences){
	this.rate = rate;	
	this.sequences = sequences;
	this.size = size;
	this.index = 0;
	this.breakSize = 64/4;
}

Clock.prototype.setRate = function(rate){
	this.rate = rate;
	if(this.interval != null){
		this.stop();
		this.start();
	}
	
}

Clock.prototype.start = function(){
	this.interval = setInterval( this.trigger.bind(this), this.rate ) ;
}

Clock.prototype.trigger = function(){
	for(i = 0; i < this.sequences.length; i++){
		this.sequences[i].trigger(this.index);
	}
	this.index = (this.index + 1) % this.size;
	console.log(this.index)
	
}	

Clock.prototype.stop = function(){
	clearInterval(this.interval);
	this.interval = null;

}

Clock.prototype.reset = function(index){
	if(index == null)
		this.index = 0;
	else 
		this.index = index;
}

var Sequencer = function(type, sequence, target, callback, startSeq){
	this.type         	  = type;
	this.sequenceType 	  = null;
	this.sequence     	  = sequence;
	this.playingSequence  = this.sequence.sequences[sequence.index];
	this.size         	  = this.playingSequence.length;
	this.target 	 	  = target;
	this.sequenceCallback = null;
	this.callback   	  = callback;
	this.currentSeq 	  = startSeq;
	this.init();
}

Sequencer.prototype.init = function(){
	this.setSequenceType(this.type);
};

Sequencer.prototype.parameterToString  = function(target){
	var test;
	test = target.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});

	return test;
}

Sequencer.prototype.setSequenceType = function(type){
	if(type == 0){
		this.sequenceCallback = this.increment;
	}else{
		this.sequenceCallback = this.decrement;
	}
}

Sequencer.prototype.setSequence = function(index){
	this.playingSequence = this.sequence.sequences[index];
}

Sequencer.prototype.trigger = function(currentSeq){	
	
	if(this.playingSequence[this.currentSeq] != 0)
	{
		window[this.target][this.callback](this.playingSequence[this.currentSeq]);					
	}
	this.sequenceCallback(currentSeq);	
}

Sequencer.prototype.increment = function(currentSeq){
		
	this.currentSeq = currentSeq % this.size;		
}

Sequencer.prototype.decrement = function(){	
	if( this.currentSeq > 0){
		this.currentSeq--
	}else{
		this.currentSeq = this.size - 1;
	}	
}


var Sequence = function(){
	this.sequences = [];
	this.index = 0;
	for(i = 0; i < arguments.length; i++){
		this.sequences[i] = arguments[i];
	}
}

Sequence.prototype.setIndex = function(index){
	this.index = index;
}
