// Peril.js 
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var Sample = function(url){
  this.url = url;
  this.request = null
  this.sample = null;

  this.init();
}

Sample.prototype.init = function(){
  var self = this;

  this.request = new XMLHttpRequest();
  this.request.open('GET', this.url, true);
  this.request.responseType = 'arraybuffer';

  this.request.onload = function() {
    AC.decodeAudioData(self.request.response, function(sample) {
      self.sample = sample;        
    });
  }

  this.request.onprogress = function(e) {
    parseInt(self.completedPercentage = (e.loaded / e.total) * 100);
  };

  this.request.onloadstart = function() {
    self.completedPercentage = 0;
  };
  
  this.request.send();
}

var Simpler = function(url, level, rate, auto){
  this.url          = url;  
  this.level        = level;
  this.playbackRate = rate;
  this.auto         = auto;

  this.request      = null
  this.sample       = null;
  this.simpler      = null;
  this.output       = null;
  this.init();

}

Simpler.prototype.init = function(){
  var self = this;

  this.request = new XMLHttpRequest();
  this.request.open('GET', this.url, true);
  this.request.responseType = 'arraybuffer';

  this.output = AC.createGain();
  this.output.gain.value = this.level;
  
  this.request.onload = function() {
    AC.decodeAudioData(self.request.response, function(sample) {
      self.sample = sample;

      if(self.auto){
        self.play();
      }
    });
  }
  this.request.onprogress = function(e) {
    parseInt(self.completedPercentage = (e.loaded / e.total) * 100);
  };

  this.request.onloadstart = function() {
    self.completedPercentage = 0;
  };
  
  this.request.send();
}

Simpler.prototype.play = function(){
    this.simpler                    = AC.createBufferSource(); 
    this.simpler.playbackRate.value = this.playbackRate;
    this.simpler.buffer             = this.sample;                   
    this.simpler.connect(this.output);
    this.simpler.start(0); 
}

Simpler.prototype.setOutput = function(){
  _setOutput(this,arguments);
}
