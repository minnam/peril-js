class Core {
  setOutput () {
    for (let i = 0; i < arguments.length; i++) {
      this.output.connect(arguments[i])
    }
  }
}

export default Core
