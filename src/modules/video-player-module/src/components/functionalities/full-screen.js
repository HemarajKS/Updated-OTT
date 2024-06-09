import IconToggle from './icon-toggle'

class FullScreenToggle extends IconToggle {
  constructor (player, element) {
    super()
    this.player = player
    this.element = element

    this.handleFullScreenChange()

    document.addEventListener(
      'fullscreenchange',
      this.handleFullScreenChange.bind(this)
    )

    element.addEventListener('click', () => {
      this.performOnClick()
    })
  }

  performOnClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      this.player.requestFullscreen()
    }
  }

  handleFullScreenChange () {
    if (this.player.isFullscreen()) {
      this.changeIcon(
        this.element,
        ['fullscreen-exit-icon'],
        ['fullscreen-icon']
      )
    } else {
      this.changeIcon(
        this.element,
        ['fullscreen-icon'],
        ['fullscreen-exit-icon']
      )
    }
  }
}

export default FullScreenToggle
