import AudioAndSubtitlesControl from './functionalities/audio-and-subtitles'
import PlayPauseToggle from './functionalities/play-pause'
import ForwardRewindToggle from './functionalities/forward-rewind'
import VolumeControlToggle from './functionalities/volume-control'
import FullScreenToggle from './functionalities/full-screen'
import Seekbar from './functionalities/seekbar'
import TitleSubtitle from './functionalities/title-subtitle'
import PreviewThumbnails from './functionalities/preview-thumbnails'
import VideoQualityControl from './functionalities/quality'
import PlaybackSpeedControl from './functionalities/playback-speed'

class VideoFunctionalities {
  constructor (player, options, isMobileDevice) {
    this.player = player
    this.options = options
    this.isMobileDevice = isMobileDevice

    this.initialize()
  }

  initialize () {
    // Declarations
    this.seekbarRef = document.getElementById('seek-bar-range')
    this.remaininTimeRef = document.getElementById('remaining-time')
    this.playPause = document.getElementById('play-pause-icon')
    this.fullscreenRef = document.getElementById('fullscreenRef')
    this.forwardRef = document.getElementById('forwardRef')
    this.rewindRef = document.getElementById('rewindRef')
    this.backIconRef = document.getElementById('backIcon')
    this.seekbarThumbnailRef = document.getElementById('seek-bar-thumbnail')

    // load playback speeds
    new PlaybackSpeedControl(this.player)

    // Navigate to previous screen
    this.backIconRef.addEventListener('click', () => {
      this.options.backIconClick()
    })

    // Unmute video initially (muted for initial autoplay)
    if (!this.player.paused()) {
      this.player.muted(false)
    }

    // Disables default click function on video
    this.player.boundHandleTechClick_ = (event) => {
      event.preventDefault()
    }

    // On tap of video screen, show control bar
    this.player.on('touchstart', () => {
      this.player.userActive(true)
    })

    // Title & Subtitle
    new TitleSubtitle(this.options.title, this.options.subTitle)

    // Toggle full screen
    new FullScreenToggle(this.player, this.fullscreenRef)

    // Listen to your play-pause button click
    new PlayPauseToggle(this.player, this.playPause)

    // Forward and rewind
    new ForwardRewindToggle(this.player, this.forwardRef, this.rewindRef)

    // Custom seek bar UI
    new Seekbar(
      this.player,
      this.seekbarRef,
      this.remaininTimeRef,
      this.playPause
    )

    // Load subtitles and audiotracks UI
    new AudioAndSubtitlesControl(this.player, this.isMobileDevice)

    // Load quality controls
    new VideoQualityControl(this.player, this.isMobileDevice)

    // Video Preview Thumbnails
    if (this.options.thumbnails) {
      new PreviewThumbnails(
        this.player,
        this.options.thumbnails,
        this.seekbarRef,
        this.seekbarThumbnailRef
      )
    }

    if (!this.isMobileDevice) {
      // Video volume control
      new VolumeControlToggle(this.player)
    }
  }
}

export default VideoFunctionalities
