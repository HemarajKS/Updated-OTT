import { Constants } from '../../assets/constants/constants'

class ForwardRewindToggle {
  constructor (player, forwardElement, rewindElement) {
    this.player = player

    forwardElement.addEventListener('click', (e) => {
      this.performOnClick(Constants.FORWARD_SEEK, Constants.FORWARD)
    })

    rewindElement.addEventListener('click', (e) => {
      this.performOnClick(Constants.REWIND_SEEK, Constants.REWIND)
    })
  }

  performOnClick (time, type) {
    const currentTime = this.player.currentTime()
    if (type === Constants.FORWARD) {
      this.player.currentTime(currentTime + time)
    } else if (type === Constants.REWIND) {
      this.player.currentTime(currentTime - time)
    }
  }
}

export default ForwardRewindToggle
