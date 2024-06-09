import { isMobileDevice } from '../helpers/utils'
import LoadVideo from './functionalities/load-video'
import VideoLoading from './functionalities/loading'
import { videoCustomUI } from './video-custom-ui'
import VideoFunctionalities from './video-functionalities'
import 'videojs-contrib-eme'

class VideoControls extends LoadVideo {
  constructor (player, options) {
    super(player, options)
    this.player = player
    this.options = options

    this.initialize()
  }

  initialize () {
    // Loading screen UI added immediately after player is rendered
    if (this.options.drmOptions) {
      this.player.eme()
    }
    this.loadVideoSource()
    new VideoLoading(this.player)

    // Player is mounted

    this.player.ready(() => {
      this.handlePlayerReady()
    })
  }

  handlePlayerReady () {
    // Custom control bar UI--> This will check whether mobile device or not and loads respective UI
    const mobileDevice = isMobileDevice()
    videoCustomUI(this.player, mobileDevice)
    this.player.userActive(false)

    // AutoPlay
    const playPromise = this.player.play()

    const controlbarRef = document.querySelector('.custom-controls-container')
    controlbarRef.style.visibility = 'hidden'
    controlbarRef.style.opacity = 0

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.player.userActive(true)

          // Custom control functionalities
          new VideoFunctionalities(this.player, this.options, mobileDevice)

          // This is just to trigger the player on load
          this.player.currentTime(0.00000001)

          controlbarRef.style.visibility = 'visible'
          controlbarRef.style.opacity = 1
        })
        .catch(() => {})
    }
  }
}

export default VideoControls
