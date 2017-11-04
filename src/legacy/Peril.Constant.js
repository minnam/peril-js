// Peril.js
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var AC     = new ( window.AudioContext || window.webkitAudioContext )(),
PI         = Math.PI,
TWOPI      = 2.0 * PI,
SAMPLERATE = AC.sampleRate;
