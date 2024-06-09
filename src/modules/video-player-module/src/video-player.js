import videojs from 'video.js'
import VideoControls from './components/video-controls'
import Errors from './components/functionalities/errors'
import { isMobileDevice } from './helpers/utils'

export default class VideoPlayer {
  constructor (selector, options) {
    this.container = document.querySelector(selector)
    this.src = options.src
    this.player = null

    this.render(options)
  }

  render (options) {
    // create video player UI
    this.container.innerHTML = `
      <div class="custom-player-wrapper">
        <video id="custom-player" class="video-js video-player" preload="auto" playsinline >        
          <source src=${this.src} type=${
            options.type ? options.type : 'application/x-mpegURL'
          } />
        </video>
      </div>
    `

    // initialise videojs
    this.player = videojs(
      'custom-player',
      {
        inactivityTimeout: 5000,
        controls: false,
        muted: true,
        loadingSpinner: false,
        errorDisplay: false,

        html5: {
          vhs: {
            overrideNative: true
          }
        }
      },
      () => {
        new VideoControls(this.player, options)
      }
    )

    new Errors(this.player, options, isMobileDevice())
  }

  destroy = () => {
    if (this.player
    ) {
      // Remove all the listeners before quitting the player
      // Stop all resource loading before unmounting
      window.stop()
      if (this.player.isReady_) {
        this.player.off()
      }
      this.player.userActive(false)
      this.player.dispose()
      this.player = null
    }
  }
}
