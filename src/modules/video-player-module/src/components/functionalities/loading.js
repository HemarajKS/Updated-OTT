import { loadingScreenUI } from '../video-custom-ui'
class VideoLoading {
  constructor (player) {
    // Initially load the UI
    player.el().insertAdjacentHTML('beforeend', loadingScreenUI())

    const customPlayerLoader = document.getElementById('custom-player-loader')

    // Initial video Loading
    player.on('loadstart', function () {
      customPlayerLoader.style.display = 'flex'
    })

    // Initial video Loading-stopped
    // player.on('loadedmetadata', function () {
    //   customPlayerLoader.style.display = 'none'
    // })

    player.on('waiting', function () {
      customPlayerLoader.style.display = 'flex'
    })

    player.on('canplaythrough', function () {
      customPlayerLoader.style.display = 'none'
    })

    // Show the custom loader when the video is seeked
    player.on('seeking', function () {
      customPlayerLoader.style.display = 'flex'
    })

    // Hide the custom loader when the video is seeked
    player.on('seeked', function () {
      customPlayerLoader.style.display = 'none'
    })

    // On error hide the loading screen
    player.on('error', () => {
      customPlayerLoader.style.display = 'none'
    })
  }
}

export default VideoLoading
