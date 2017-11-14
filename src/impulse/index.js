import _ from 'lodash'
import Core from '../core'
import ERRORS from '../errors.js'
import {CONTEXT, PI, TWOPI, SAMPLERATE} from '../constant'

/**
 * Impulse
 * @param {Object={}} props Parameter object for Oscillator class
 * @param {number=0} type Index of waveform
 * @param {freq=440} freq Frequency in Hertz
 * @param {gain=0} gain Level of output
 * @param {phase=0} phase Phase in radian
 * @param {offset=0} offset Offset to frequency in Hertz
 */
class Impulse extends Core {
  constructor (props = {}) {
    super(props)

    this.setType(props.type)
    this.setFreq(props.freq)
    this.setGain(props.gain)
    this.setPhase(props.phase)
    this.offset = props.offset || 0
    this.sync = props.sync
    this.mod = props.mod


    /* istanbul ignore next */
    if (CONTEXT) {
      this.processor = CONTEXT.createScriptProcessor(1024)
      this.processor.onaudioprocess = this.process.bind(this)

      this.input = CONTEXT.createChannelMerger(10)

      let mod, sync;

      if (this.mod && this.mod.output) {
        this.mod.processor.connect(this.input)
      } else {
        CONTEXT.createChannelMerger(1).connect(this.input)
      }

      this.input.connect(this.processor)
      this.output = CONTEXT.createGain()
      this.output.gain.value = this.gain

      this.processor.connect(this.output)
    }
  }

  update () {
    this.processor.onaudioprocess = this.process.bind(this)
  }

  setType (type) {
    this.type = type || 0
    switch (this.type) {
      case 0:
        this.callback = this.getSineTick
        break
      case 1:
        this.callback = this.getTriTick
        break
      case 2:
        this.callback = this.getSawtoothDTick
        break
      case 3:
        this.callback = this.getSawtoothUTick
        break
      case 4:
      default:
        this.callback = this.getSquareTick
        break
    }
  }

  setFreq (freq) {
    if (freq <= 0) {
      this.freq = 440
      throw new Error(ERRORS.invalidFreq)
    } else {
      this.freq = freq || 440
      console.log(this.freq)
    }
  }

  setGain (gain) {
    if (gain < 0) {
      this.gain = 0
      throw new Error(ERRORS.invalidGain)
    } else {
      this.gain = gain || 0
    }
  }

  setPhase (phase) {
    this.phase = phase || 0
  }

  /**
   * reset - reset phase
   */
  reset () {

    this.phase = 0
    // this.freq = this.props.freq
  }

  /* istanbul ignore next */
  process (event) {
    var inputArray1 = event.inputBuffer.getChannelData(0)
    var inputArray2 = event.inputBuffer.getChannelData(1)
    var outputArray = event.outputBuffer.getChannelData(0)
    var bufferSize = outputArray.length

    for (this.i = 0; this.i < bufferSize; this.i++) {

      if (this.phase == 0) {        
        outputArray[this.i] = 1
      } else {
        outputArray[this.i] = 0
      }
      this.phase += (this.getPhaseIncrement((this.mod ? (inputArray1[this.i] * this.mod.gain) + this.freq : 0) + this.offset))

      if (this.phase >= TWOPI) {
        this.reset()
      }
    }
  }

  getPhaseIncrement (freq = 0) {
    return (TWOPI * (this.freq + freq)) / SAMPLERATE
  }

  wrap () {
    /* istanbul ignore next */
    if (this.phase > 1) {
      this.reset()
    }
  }
}

export default Impulse
