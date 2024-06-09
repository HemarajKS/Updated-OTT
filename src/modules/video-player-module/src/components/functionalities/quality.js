import { Constants } from '../../assets/constants/constants'
import { Text } from '../../assets/strings/en'
import { aggregation } from '../../helpers/classes'
import HandleClicks from '../../helpers/clickHelpers'
import SwitchTab from '../../helpers/switchTab'
import { settingsPopoverItemsUI } from '../video-custom-ui'
import IconToggle from './icon-toggle'

class VideoQualityControl extends aggregation(IconToggle, HandleClicks) {
  constructor (player, isMobileDevice) {
    super()
    this.player = player
    this.settingsRef = document.getElementById('settings-popover-quality')
    const settingsPopoverRef = document.getElementById('settings-popover')
    const settingsPopoverContentRef = document.getElementById(
      'settings-popover-ref'
    )
    const closePopoverRef = document.getElementById(
      'custom-controls-popover-close'
    )

    settingsPopoverRef.addEventListener('click', (event) => {
      this.toggleCaptionPopover(settingsPopoverContentRef)
    })

    document.addEventListener('click', (event) => {
      this.hidePopoverOutsideClick(
        event,
        settingsPopoverRef,
        settingsPopoverContentRef
      )
    })

    if (isMobileDevice) {
      closePopoverRef.addEventListener('click', () => {
        this.toggleCaptionPopover(settingsPopoverContentRef)
      })
    }

    this.setupQualityOptions()
    this.attachEventListeners()

    new SwitchTab()
  }

  setupQualityOptions () {
    this.settingsRef.innerHTML = ''

    const autoOptionContent = settingsPopoverItemsUI(
      Text.default,
      true,
      `${Constants.QUALITY_ID_PREFIX}--${Constants.AUTO}`
    )
    this.settingsRef.insertAdjacentHTML('beforeend', autoOptionContent)

    const encounteredQualityLevels = {}

    const qualityLevels = this.player.qualityLevels().levels_
    const sortedQualityLevels = qualityLevels.sort(
      (a, b) => b.height - a.height
    )

    sortedQualityLevels.forEach((qualityLevel) => {
      const qualityHeight = qualityLevel.height

      if (!encounteredQualityLevels[qualityHeight]) {
        encounteredQualityLevels[qualityHeight] = true

        const content = settingsPopoverItemsUI(
          qualityLevel.height + `${Constants.QUALITY_SUFFIX}`,
          false,
          `${Constants.QUALITY_ID_PREFIX}--${qualityLevel.height}`
        )
        if (qualityLevel.bitrate) {
          if (qualityLevel.height) {
            this.settingsRef.insertAdjacentHTML('beforeend', content)
          }
        }
      }
    })
  }

  attachEventListeners () {
    this.settingsRef.addEventListener(
      'click',
      this.handleQualitySelection.bind(this)
    )
  }

  handleQualitySelection (event) {
    const clickedDivId = event.target.id
    const isAutoQuality = clickedDivId.endsWith(`--${Constants.AUTO}`)

    this.settingsRef
      .querySelectorAll('.custom-controls__settings-popover-option-selected')
      .forEach((element) => {
        this.changeIcon(
          element,
          [],
          ['custom-controls__settings-popover-option-selected', 'tick-icon']
        )
      })

    if (isAutoQuality) {
      this.changeIcon(
        document.getElementById(clickedDivId),
        ['custom-controls__settings-popover-option-selected', 'tick-icon'],
        []
      )

      const qualityLevels = this.player.qualityLevels()
      for (let i = 0; i < qualityLevels.length; i++) {
        qualityLevels[i].enabled = true
      }
    } else {
      const selectedQualityHeight = Number(clickedDivId.split('--').pop())
      this.enableQualityLevel(selectedQualityHeight)
      this.changeIcon(
        document.getElementById(clickedDivId),
        ['custom-controls__settings-popover-option-selected', 'tick-icon'],
        []
      )
    }
  }

  enableQualityLevel (level) {
    const qualityLevels = this.player.qualityLevels()
    if (level) {
      for (let i = 0; i < qualityLevels.length; i++) {
        const qualityLevel = qualityLevels[i]
        qualityLevel.enabled = qualityLevel.height === level
      }
      qualityLevels.selectedIndex_ = level
      qualityLevels.trigger({ type: 'change', selectedIndex: level })
    }
  }
}

export default VideoQualityControl
