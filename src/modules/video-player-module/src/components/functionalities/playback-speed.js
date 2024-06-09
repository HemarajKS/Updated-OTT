import { Constants } from '../../assets/constants/constants'
import SwitchTab from '../../helpers/switchTab'
import { speedPopoverSlider } from '../video-custom-ui'
import IconToggle from './icon-toggle'

class PlaybackSpeedControl extends IconToggle {
  constructor (player) {
    super()
    this.player = player
    this.settingsRef = document.getElementById('settings-popover-speed')
    this.playbackSpeedList = Constants.playbackSpeeds
    this.setupPlaybackSpeedOptions()
    this.attachEventListeners()

    new SwitchTab()
  }

  setupPlaybackSpeedOptions () {
    const currentSpeed = this.player.playbackRate()

    this.playbackSpeedList.forEach((playSpeed) => {
      const content = speedPopoverSlider(
        playSpeed.label,
        currentSpeed === playSpeed.value,
        `${Constants.SPEED_ID_PREFIX}--${playSpeed.value}`
      )
      this.settingsRef.insertAdjacentHTML('beforeend', content)
    })
  }

  attachEventListeners () {
    this.settingsRef.addEventListener(
      'click',
      this.handlePlaybackSpeedSelection.bind(this)
    )
  }

  handlePlaybackSpeedSelection (event) {
    const clickedDiv = event.target.closest(
      '.custom-controls__playback-speed-popover-option'
    )
    if (clickedDiv) {
      const clickedDivId = clickedDiv.id

      const selectedDiv = document.getElementById(clickedDivId)

      const selectedSpeed = Number(
        clickedDivId.split('--')[clickedDivId.split('--').length - 1]
      )

      if (!isNaN(selectedSpeed)) {
        this.player.playbackRate(selectedSpeed)

        this.settingsRef
          .querySelectorAll(
            '.custom-controls__playback-speed-popover-option-selected'
          )
          .forEach((element) => {
            this.changeIcon(
              element,
              [],
              ['custom-controls__playback-speed-popover-option-selected']
            )
          })
        if (selectedDiv) {
          this.changeIcon(
            selectedDiv,
            ['custom-controls__playback-speed-popover-option-selected'],
            []
          )
        }
      }
    }
  }
}

export default PlaybackSpeedControl
