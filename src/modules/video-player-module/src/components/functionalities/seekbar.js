import { aggregation } from '../../helpers/classes'
import { formatTime, getStyleFromVariable } from '../../helpers/utils'
import IconToggle from './icon-toggle'
import SliderUI from './slider-ui'

class Seekbar extends aggregation(IconToggle, SliderUI) {
  constructor (player, element, remainingTimeElement, playPauseRef) {
    super()

    this.player = player
    let isSeeking = false
    let isPaused = false
    this.primaryColor = getStyleFromVariable('--primary-color')
    this.accentColor = getStyleFromVariable('--accent-color')

    const remaininTimeRef = document.getElementById('remaining-time')

    element.addEventListener('input', (event) => {
      const tempSliderValue = Number(event.target.value)
      this.seekBarFunction(
        player,
        tempSliderValue,
        element,
        remainingTimeElement
      )
    })

    // check whether video is playing or paused before seeking
    element.addEventListener('mousedown', () => {
      isSeeking = true
      isPaused = player.paused()
    })

    // get the playing status of video before dragging seekbar
    element.addEventListener('mousemove', () => {
      this.pauseVideo(isSeeking)
    })

    element.addEventListener('mouseup', () => {
      isSeeking = false
    })

    // check whether video is playing or paused before seeking- touch screens
    element.addEventListener('touchstart', () => {
      isSeeking = true
      isPaused = player.paused()
    })

    // get the playing status of video before dragging seekbar-touch screens
    element.addEventListener('touchmove', () => {
      this.pauseVideo(isSeeking)
    })

    element.addEventListener('touchend', () => {
      isSeeking = false
    })

    // on seekbar progress update the time
    player.on('timeupdate', () => {
      if (!isSeeking) {
        this.timeUpdateFunction(player, element, remaininTimeRef)
      }

      if (player.currentTime() === player.duration()) {
        this.changeIcon(
          playPauseRef,
          ['replay-icon'],
          ['pause-icon', 'play-icon']
        )
      } else {
        if (player.paused()) {
          this.changeIcon(
            playPauseRef,
            ['play-icon'],
            ['replay-icon', 'pause-icon']
          )
        } else {
          this.changeIcon(
            playPauseRef,
            ['pause-icon'],
            ['replay-icon', 'play-icon']
          )
        }
      }
    })

    // custom seek bar
    element.addEventListener('change', (event) => {
      this.videoUpdate(event, isPaused)
    })

    // detect video ended and add replay icon

    player.on('ended', () => {
      this.changeIcon(
        playPauseRef,
        ['replay-icon'],
        ['pause-icon', 'play-icon']
      )
    })
  }

  seekBarFunction = (
    player,
    tempSliderValue,
    seekbarRef,
    remainingTimeElement
  ) => {
    const progress = (tempSliderValue / seekbarRef.max) * 100
    this.updateProgressUI(
      progress,
      seekbarRef,
      this.primaryColor,
      this.accentColor
    )
    const value = (tempSliderValue * player.duration()) / 100
    remainingTimeElement.textContent = formatTime(player.duration(), value)
  }

  videoUpdate = (event, isPaused) => {
    const tempSliderValue = Number(event.target.value)
    this.seekBarVideoUpdateFunction(this.player, tempSliderValue, isPaused)
  }

  pauseVideo = (isSeeking) => {
    if (isSeeking) {
      const paused = this.player.paused()
      if (!paused) {
        this.player.pause()
      }
    }
  }

  // update video on seekbar progress
  seekBarVideoUpdateFunction = (player, tempSliderValue, isPaused) => {
    const value = (tempSliderValue * player.duration()) / 100
    player.currentTime(value)
    if (!isPaused) {
      player
        .play()
        .then((_) => {})
        .catch(() => {})
    }
  }

  // time update on seekbar progress
  timeUpdateFunction = (player, seekbarRef, remaininTimeRef) => {
    const value = (player.currentTime() / player.duration()) * 100 || 0
    seekbarRef.value = value
    this.updateProgressUI(
      value,
      seekbarRef,
      this.primaryColor,
      this.accentColor
    )
    remaininTimeRef.textContent = formatTime(
      player.duration(),
      player.currentTime()
    )
  }
}

export default Seekbar
