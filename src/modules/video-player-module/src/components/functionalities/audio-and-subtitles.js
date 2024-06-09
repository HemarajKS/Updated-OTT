import { Constants } from '../../assets/constants/constants'
import { Text } from '../../assets/strings/en'
import { aggregation } from '../../helpers/classes'
import HandleClicks from '../../helpers/clickHelpers'
import TabChange from '../../helpers/tabChange'
import { isIphone } from '../../helpers/utils'
import { popoverItemsUI } from '../video-custom-ui'
import IconToggle from './icon-toggle'

class AudioAndSubtitlesControl extends aggregation(IconToggle, HandleClicks) {
  constructor (player, isMobileDevice) {
    super()
    const captionPopoverRef = document.getElementById('caption-popover')
    const captionPopoverContentRef = document.getElementById(
      'caption-popover-ref'
    )
    this.player = player
    this.subtitleRef = document.getElementById('caption-popover-subtitles')
    this.audioRef = document.getElementById('caption-popover-audios')

    const closeIconRef = document.getElementById(
      'custom-controls-caption-popover-close'
    )
    this.audioTracks = []
    this.textTracks = []
    this.init()

    captionPopoverRef.addEventListener('click', (event) => {
      this.toggleCaptionPopover(captionPopoverContentRef)
    })

    document.addEventListener('click', (event) => {
      this.hidePopoverOutsideClick(
        event,
        captionPopoverRef,
        captionPopoverContentRef
      )
    })

    // Tab change on clicking subtitles and audio tab functionality
    new TabChange()

    this.adjustSubtitlePosition()

    if (isMobileDevice) {
      closeIconRef.addEventListener('click', () => {
        this.toggleCaptionPopover(captionPopoverContentRef)
      })
    }
  }

  init () {
    this.audioTracks =
      this.player.audioTracks_.tracks_.length > 0
        ? this.player.audioTracks_.tracks_
        : [
            {
              label: 'default',
              enabled: true
            }
          ]
    this.textTracks = this.player.textTracks_.tracks_
    this.setupTextTracks()
    this.setupAudioTracks()

    const initiallySelectedTextTrack = this.subtitleRef.querySelectorAll(
      '.custom-controls__caption-popover-option-selected'
    )

    const textTrackOffRef = document.getElementById(
      `${Constants.TEXT_TRACK_ID_PREFIX}--${Constants.DISABLE_CAPTIONS}`
    )
    if (initiallySelectedTextTrack.length === 0) {
      this.changeIcon(
        textTrackOffRef,

        ['custom-controls__caption-popover-option-selected', 'tick-icon'],
        []
      )
    }
  }

  setupTextTracks () {
    const activeTextTrack = this.textTracks.find(
      (track) => track.mode === Constants.SHOWING
    )

    let content = popoverItemsUI(
      Text.off,
      false,
      `${Constants.TEXT_TRACK_ID_PREFIX}--${Constants.DISABLE_CAPTIONS}`
    )
    this.subtitleRef.insertAdjacentHTML('beforeend', content)

    this.textTracks.forEach((track) => {
      if (
        (track.kind === Constants.SUBTITLES ||
          track.kind === Constants.CAPTIONS) &&
        track.label
      ) {
        content = popoverItemsUI(
          track.label,
          track.mode === Constants.SHOWING,
          `${Constants.TEXT_TRACK_ID_PREFIX}--${track.language}`,
          activeTextTrack
        )

        this.subtitleRef.insertAdjacentHTML('beforeend', content)
      }
    })

    this.subtitleRef.addEventListener('click', (event) =>
      this.handleTextTrackSelection(event)
    )
  }

  handleTextTrackSelection (event) {
    const clickedDivId = event.target.id
    const selectedDiv = document.getElementById(clickedDivId)

    const selectedLanguage =
      clickedDivId.split('--')[clickedDivId.split('--').length - 1]

    for (let i = 0; i < this.textTracks.length; i++) {
      const track = this.textTracks[i]

      track.mode = Constants.DISABLED
      if (
        (track.kind === Constants.SUBTITLES ||
          track.kind === Constants.CAPTIONS) &&
        track.language === selectedLanguage
      ) {
        track.mode = Constants.SHOWING

        this.subtitleRef
          .querySelectorAll('.custom-controls__caption-popover-option-selected')
          .forEach((element) => {
            this.changeIcon(
              element,
              [],
              ['custom-controls__caption-popover-option-selected', 'tick-icon']
            )
          })

        this.changeIcon(
          selectedDiv,
          ['custom-controls__caption-popover-option-selected', 'tick-icon'],
          []
        )
      } else if (selectedLanguage === Constants.DISABLE_CAPTIONS) {
        for (let i = 0; i < this.textTracks.length; i++) {
          this.textTracks[i].mode = Constants.DISABLED

          this.subtitleRef
            .querySelectorAll(
              '.custom-controls__caption-popover-option-selected'
            )
            .forEach((element) => {
              this.changeIcon(
                element,
                [],
                [
                  'custom-controls__caption-popover-option-selected',
                  'tick-icon'
                ]
              )
            })

          this.changeIcon(
            selectedDiv,
            ['custom-controls__caption-popover-option-selected', 'tick-icon'],
            []
          )
        }
      }
    }
  }

  setupAudioTracks () {
    if (this.player.audioTracks_.tracks_.length > 0) {
      this.player.audioTracks_.tracks_.forEach((track) => {
        const content = popoverItemsUI(
          track.label || Text.defaultText,
          track.enabled,
          `${Constants.AUDIO_TRACK_ID_PREFIX}--${track.id}`
        )
        this.audioRef.insertAdjacentHTML('beforeend', content)
      })
    } else {
      const content = popoverItemsUI(Text.defaultText, true)
      this.audioRef.insertAdjacentHTML('beforeend', content)
    }

    this.audioRef.addEventListener('click', (event) =>
      this.handleAudioTrackSelection(event)
    )
  }

  handleAudioTrackSelection (event) {
    const clickedDivId = event.target.id

    const selectedAudioTrackId =
      clickedDivId.split('--')[clickedDivId.split('--').length - 1]

    const selectedDiv = document.getElementById(clickedDivId)
    if (this.currentAudioTrack) {
      this.currentAudioTrack.enabled = false
    }

    const selectedAudioTrack = this.audioTracks.find(
      (track) => track.id === selectedAudioTrackId
    )
    if (selectedAudioTrack) {
      selectedAudioTrack.enabled = true

      this.audioRef
        .querySelectorAll('.custom-controls__caption-popover-option-selected')
        .forEach((element) => {
          this.changeIcon(
            element,
            [],
            ['custom-controls__caption-popover-option-selected', 'tick-icon']
          )
        })

      this.changeIcon(
        selectedDiv,
        ['custom-controls__caption-popover-option-selected', 'tick-icon'],
        []
      )
    }
  }

  adjustSubtitlePosition () {
    if (isIphone()) {
      this.containerElement = document.querySelector('.custom-player-wrapper')
      const controlbarHeight = document
        .getElementById('custom-controls-ref')
        .getBoundingClientRect().height

      // Initial setup
      this.containerElement.style.setProperty(
        '--mobile-subtitles-margin-bottom',
        `-${controlbarHeight + 10}px`
      )

      this.player.on('useractive', () => {
        this.containerElement.style.setProperty(
          '--mobile-subtitles-margin-bottom',
          `-${controlbarHeight + 10}px`
        )
      })

      this.player.on('userinactive', () => {
        this.containerElement.style.setProperty(
          '--mobile-subtitles-margin-bottom',
          'unset'
        )
      })
    } else {
      const subtitleContainerRefPos = document
        .querySelector('.vjs-text-track-display')
        .getBoundingClientRect().bottom

      const subtitleContentRef = document.querySelector(
        '.vjs-text-track-display'
      )

      const controlbarRefPos = document
        .getElementById('custom-controls-ref')
        .getBoundingClientRect().top

      subtitleContentRef.style.marginBottom = `${
        controlbarRefPos - subtitleContainerRefPos < 0
          ? subtitleContainerRefPos - controlbarRefPos
          : 0
      }px`

      this.player.on('useractive', function () {
        subtitleContentRef.style.marginBottom = `${
          controlbarRefPos - subtitleContainerRefPos < 0
            ? subtitleContainerRefPos - controlbarRefPos
            : 0
        }px`
      })

      this.player.on('userinactive', function () {
        subtitleContentRef.style.marginBottom = `${0}px`
      })
    }
  }
}

export default AudioAndSubtitlesControl
