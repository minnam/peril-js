// export const AC = new (window.AudioContext || window.webkitAudioContext)()
// export const PI = Math.PI
// export const TWOPI = 2.0 * PI
// export const SAMPLERATE = AC.sampleRate

export const CONTEXT = window.AudioContext || window.webkitAudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null
export const PI = Math.PI
export const TWOPI = Math.PI * 2
export const SAMPLERATE = CONTEXT ? CONTEXT.sampleRate : 44100
