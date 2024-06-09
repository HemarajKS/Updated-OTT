import IconToggle from './icon-toggle'
import { volumeControlUI } from '../video-custom-ui'
import { aggregation } from '../../helpers/classes'
import SliderUI from './slider-ui'
import { getStyleFromVariable } from '../../helpers/utils'
import HandleClicks from '../../helpers/clickHelpers'

class VolumeControlToggle extends aggregation(
  IconToggle,
  SliderUI,
  HandleClicks
) {
  constructor (player) {
    super()

    this.primaryColor = getStyleFromVariable('--primary-color')
    this.accentColor = getStyleFromVariable('--accent-color')
    this.volumeControlIconRef = document.getElementById('volume-control-icon')
    this.player = player
    this.volumePopover = this.initVolumePopover()
    this.volumeRange = document.getElementById('volume-control-range')
    this.setupEventListeners()
  }

  initVolumePopover () {
    const volumePopoverHTML = volumeControlUI()
    this.volumeControlIconRef.insertAdjacentHTML(
      'beforeend',
      volumePopoverHTML
    )
    return document.getElementById('volume-control-popover')
  }

  setupEventListeners () {
    this.volumeRange.addEventListener(
      'input',
      this.handleVolumeChange.bind(this)
    )

    this.player.on('volumechange', this.updateVolumeUI.bind(this))

    this.volumeControlIconRef.addEventListener('click', () => {
      this.toggleCaptionPopover(this.volumePopover)
    })

    document.addEventListener('click', (event) => {
      this.hidePopoverOutsideClick(
        event,
        this.volumeControlIconRef,
        this.volumePopover
      )
    })

    this.volumePopover.addEventListener('click', (event) => {
      event.stopPropagation()
    })
  }

  handleVolumeChange (event) {
    const volume = Number(event.target.value)
    this.player.volume(volume)
  }

  updateVolumeUI = () => {
    const volume = this.player.volume() * 100
    this.volumeRange.value = this.player.volume()
    this.updateProgressUI(
      volume,
      this.volumeRange,
      this.primaryColor,
      this.accentColor
    )
  }
}

export default VolumeControlToggle
