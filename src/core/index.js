class Core {
  constructor (props) {
    this.props = Object.assign({}, props)
  }

  setOutput () {
    for (let i = 0; i < arguments.length; i++) {
      this.output.connect(arguments[i])
    }
  }
}

export default Core
