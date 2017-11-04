var AR = function(target, attack, release){
	this.target  = target;
	this.attack  = attack;
	this.release = release;
}



AR.prototype.trigger = function(level){
	var now = AC.currentTime;
	this.target.cancelScheduledValues(now);
    this.target.setValueAtTime(0, now);
    this.target.linearRampToValueAtTime(level, now + this.attack);
    this.target.linearRampToValueAtTime(0, now + this.attack + this.release);
}
