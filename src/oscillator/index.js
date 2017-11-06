import Core from '../core'
import {CONTEXT, PI, TWOPI, SAMPLERATE} from '../constant'

class Oscillator extends Core {
  constructor (props = {}) {
    super(props)

    this.type = props.type || 0
    this.freq = props.freq || 440
    this.gain = props.gain || 0
    this.phase = props.phase || 0
    this.mod = props.mod

    this.setType(this.type)

    if (CONTEXT) {
      this.processor = CONTEXT.createScriptProcessor(1024)
      this.processor.onaudioprocess = this.process.bind(this)

      this.input = CONTEXT.createChannelMerger(2)

      if (this.mod) {
        this.mod.connect(this.input)
      }

      this.input.connect(this.processor)


      this.output = CONTEXT.createGain()
      this.output.gain.value = this.gain

      this.processor.connect(this.output)
    }
  }

  /* istanbul ignore next */
  setType (type) {
    this.type = type
    switch (this.type) {
      case 0:
        this.callback = this.getSineTick
        break
      case 1:
        this.callback = this.getSquareTick
        break
      case 2:
        this.callback = this.getSawtoothDTick
        break
      case 3:
        this.callback = this.getSawtoothUTick
        break
      case 4:
      default:
        this.callback = this.getTriTick
        break
    }
  }

  /* istanbul ignore next */
  process (event) {
    var inputArray1 = event.inputBuffer.getChannelData(0)
    var inputArray2 = event.inputBuffer.getChannelData(1)
    var outputArray = event.outputBuffer.getChannelData(0)
    var bufferSize = outputArray.length

    for (let i = 0; i < bufferSize; i++) {
      outputArray[i] = this.callback(0)
      this.freq = (inputArray1[i] ? inputArray1[i] + this.freq : this.freq)
      this.phase += (this.getPhaseIncrement(this.lastInput))
      this.lastInput = inputArray2[i]
      this.wrap()
    }
  }

  getSineTick (phase) {
    return Math.sin(this.phase + phase)
  }

  getSquareTick (phase) {
    if ((this.phase + phase) <= PI) {
      return 1
    }
    return -1
  }

  getSawtoothUTick (phase) {
    return 2 * (((this.phase + phase) * (1.0 / TWOPI))) - 1.0
  }

  getSawtoothDTick (phase) {
    return 1.0 - 2 * ((this.phase + phase) * (1.0 / TWOPI))
  }

  getTriTick (phase) {
    let val = (2 * ((this.phase + phase) * (1.0 / TWOPI))) - 1.0
    /* istanbul ignore next */
    if (val < 0.0) {
      val = -val
    }
    val = 2.0 * (val - 0.5)
    return val
  }

  getPhaseIncrement (freq = 0) {
    return (TWOPI * (this.freq + freq)) / SAMPLERATE
  }

  wrap () {
    /* istanbul ignore next */
    if (this.phase > TWOPI) {
      this.phase -= TWOPI
    }
  }
}

export default Oscillator
