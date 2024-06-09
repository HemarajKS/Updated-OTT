import { Constants } from '../../assets/constants/constants'
import { videoErrorsUI, videoErrorsUIMobile } from '../video-custom-ui'
import VideoFunctionalities from '../video-functionalities'
import LoadVideo from './load-video'

class Errors extends LoadVideo {
  constructor (player, options, isMobile) {
    super(player, options)
    player.on('error', () => {
      // In case error messages are not mentioned in the errorMessages.js file, show the default error message
      const controlbarRef = document.querySelector(
        '.custom-controls-container'
      )
      controlbarRef.style.visibility = 'hidden'

      const content = isMobile
        ? videoErrorsUIMobile(
          Constants.errorMessages[player.error_.code] || player.error_.message
        )
        : videoErrorsUI(
          Constants.errorMessages[player.error_.code] || player.error_.message
        )
      player.el().insertAdjacentHTML('beforeend', content)

      const buttonRef = document.getElementById(
        'custom-player-error-tryagain-btn'
      )

      // Retry functionality
      const handleClick = () => {
        const errorElements = document.querySelectorAll('#custom-player-error')
        errorElements.forEach((errorElement) => {
          player.el().removeChild(errorElement)
        })

        this.loadVideoSource()

        player
          .play()
          .then(() => {
            new VideoFunctionalities(player, options)
            controlbarRef.style.visibility = 'visible'
            controlbarRef.style.opacity = 1
          })
          .catch(() => {
          })
      }

      buttonRef.addEventListener('click', handleClick)

      // Close icon click
      const closeIconRef = document.getElementById(
        'custom-controls-error-close'
      )

      closeIconRef.addEventListener('click', () => {
        options.backIconClick()
      })
    })
  }
}

export default Errors
