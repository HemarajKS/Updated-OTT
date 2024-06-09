import IconToggle from './icon-toggle'

class PlayPauseToggle extends IconToggle {
  constructor (player, element) {
    super()
    this.player = player
    this.element = element

    element.addEventListener('click', () => {
      this.performOnClick()
    })

    this.handlePlayerListeners()
  }

  handlePlayerListeners () {
    if (this.player.currentTime() === this.player.duration()) {
      this.changeIcon(
        this.element,
        ['replay-icon'],
        ['pause-icon', 'play-icon']
      )
    } else {
      this.player.on('play', () => {
        this.changeIcon(
          this.element,
          ['pause-icon'],
          ['play-icon', 'replay-icon']
        )
      })
      this.player.on('pause', () => {
        this.changeIcon(
          this.element,
          ['play-icon'],
          ['pause-icon', 'replay-icon']
        )
      })
    }
  }

  performOnClick () {
    if (!this.player.paused()) {
      this.player.pause()
    } else {
      this.player
        .play()
        .then(() => {})
        .catch(() => {})
    }
  }
}

export default PlayPauseToggle
