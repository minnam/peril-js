import Core from '../core'
import {CONTEXT, PI, TWOPI, SAMPLERATE} from '../constant'

class Channel extends Core {
  constructor (props = {}) {
    super(props)
    this.pan = props.pan || 0.5
    this.gain = props.gain || 0.1

    this.input = CONTEXT.createStereoPanner()
    this.input.pan.value = this.pan

    this.output = CONTEXT.createGain()
    this.output.gain.value = this.gain

    this.input.connect(this.output)
  }
}

export default Channel
