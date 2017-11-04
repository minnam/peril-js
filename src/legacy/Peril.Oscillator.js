// Peril.js
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var Oscillator = function( type, frequency, level, phase, add ) {

	this.type      = type;
	this.frequency = frequency;
	this.level	   = level || 0;
	this.phase     = phase;
	this.callback  = null;
	this.processor = null;
	this.input     = null;
	this.output    = null;
	this.lastInput = 0;

	this.init();

};

Oscillator.prototype.init = function() {

	this.setType( this.type );

		this.processor = AC.createScriptProcessor( 0, 2, 1 );
    this.processor.onaudioprocess = this.process.bind( this );

    this.input = AC.createChannelMerger( 2 );
    this.input.connect( this.processor );

    this.output = AC.createGain();
		console.log(this.level);
		this.output.gain.value = this.level;

    this.processor.connect( this.output );
}

Oscillator.prototype.setType = function(type){
	this.type = type;
	switch(this.type){
		case 0:
			this.callback = this.getSineTick;
			break;
		case 1:
			this.callback = this.getSquareTick;
			break;
		case 2:
			this.callback = this.getSawdTick;
			break;
		case 3:
			this.callback = this.getSawuTick;
			break;
		case 4:
			this.callback = this.getTriTick;
			break;
	}
}

Oscillator.prototype.setOutput = function(){
  _setOutput(this,arguments);
}

Oscillator.prototype.setFrequency = function( frequency ){
	this.frequency = frequency;
}

Oscillator.prototype.setAmplitude = function( amplitude ){
	this.output.gain.value = amplitude;
}

Oscillator.prototype.setPhase = function( phase ){
	this.phase = phase;
}



Oscillator.prototype.process = function(event){
		var inputArray1 = event.inputBuffer.getChannelData(0);
		var inputArray2 = event.inputBuffer.getChannelData(1);
    var outputArray = event.outputBuffer.getChannelData(0);
    var bufferSize = outputArray.length;

    for (i = 0; i < bufferSize; i++)
    {
        outputArray[i] = this.callback(0);
        this.phase += (this.getPhaseIncrement( this.lastInput ) )
        this.lastInput = inputArray1[i];
        this.wrap();
    }
}

Oscillator.prototype.getPhaseIncrement = function(fm){
	return (2 * Math.PI * (this.frequency + fm)) / SAMPLERATE ;
}


Oscillator.prototype.getSineTick = function(pm){
	return Math.sin(this.phase + pm);
}

Oscillator.prototype.getSquareTick = function(){
	if(this.phase <= Math.PI){
		return 1;
	}
	return -1;
}

Oscillator.prototype.getSawdTick = function(pm){
	return 1.0 - 2 *( ( this.phase + pm ) * (1.0/TWOPI) );
}

Oscillator.prototype.getSawuTick = function(pm){
	return 2 * ( ( ( this.phase + pm ) * (1.0/TWOPI) )) - 1.0;
}

Oscillator.prototype.getTriTick = function(pm){
	var val = (2 * ( ( this.phase + pm ) * (1.0/TWOPI) )) - 1.0;
	if( val < 0.0){
		val = -val;
	}
	val = 2.0 * (val - 0.5);
	return val;
}

Oscillator.prototype.wrap = function(inc){
	if (this.phase > TWOPI)
    {
        this.phase -= TWOPI;
    }
}
