var Reverb = function( url, dryLevel, wetLevel ) {

  this.url        = url;
  this.request    = null
  this.impulse    = null;
  this.reverb     = null;
  this.outputDry  = null;
  this.outputWet  = null;
  this.dryLevel   = dryLevel;
  this.wetLevel   = wetLevel;

}

Reverb.prototype.init = function() {

  var self     = this;
  this.request = new XMLHttpRequest();
  this.request.open('GET', this.url, true);
  this.request.responseType = 'arraybuffer';
  
  this.reverb               = AC.createConvolver();
  this.outputDry            = AC.createGain();
  this.outputDry.gain.value = this.dryLevel;
  this.outputWet            = AC.createGain();
  this.outputWet.gain.value = this.wetLevel;
  
  this.reverb.connect( self.outputWet );
  
  this.request.onload = function() {

    AC.decodeAudioData( self.request.response, function( impulse ) {

      self.impulse       = impulse;            
      self.reverb.buffer = self.impulse;
      
    });

  }

  this.request.onprogress = function( e ) {

    self.completedPercentage = parseInt( ( e.loaded / e.total ) * 100 );

  }

  this.request.onloadstart = function() {

    self.completedPercentage = 0;

  }
  
  this.request.send();

}

var Delay = function( time, feedback ) {

  this.time     = time;
  this.feedback = feedback;

  this.delay                 = AC.createDelay();
  this.delay.delayTime.value = time;
  this.output                = AC.createGain();
  this.output.gain.value     = this.feedback;

  this.init();

}

Delay.prototype.init = function() {

  this.delay.connect( this.output );
  this.output.connect( this.delay );

}

Delay.prototype.setOutput = function(){

  _setOutput(this,arguments);

}

