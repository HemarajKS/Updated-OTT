class LoadVideo {
  constructor (player, options) {
    this.player = player
    this.options = options
  }

  loadVideoSource () {
    const playerConfig = {
      src: this.options.src,
      type: this.options.type ? this.options.type : 'application/x-mpegURL'
    }

    if (this.options.drmOptions) {
      playerConfig.keySystems = { ...this.options.drmOptions }
    }

    this.player.src(playerConfig)
  }
}

export default LoadVideo
