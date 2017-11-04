// Peril.js 
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var mtof = function(midi){
	return Math.pow(2, (midi - 69)/12 )  * 440;
}

var ftom = function(freq){
	return 12 * (Math.log(freq/440)/Math.LN2) + 69;
}

var rand1 = function(min, max){
	return  parseInt(Math.random() * (max - min)) + min;
}

var rand2 = function(){
	var val = parseInt(Math.random() * 2);
	if( val > 0 ){
		return 1;
	}else{
		return -1;
	}
}

// drunl
// var rand3M = [];
// var rand3 = function(min, max){
// 	if(rand3M.length == 0){
// 		for(i = 0; i < max-min i ++){
			
// 		}
// 	}
// } 

var beatToSecond = function(beat){

	return 60000/beat;
}









