import { Constants } from '../../assets/constants/constants'
import { fetchAndParseVTT } from '../../helpers/parseVTT'
import { preloadImages } from '../../helpers/preloadImages'
import { formatTime, timeToSeconds } from '../../helpers/utils'

class PreviewThumbnails {
  constructor (player, options, seekbarRef, seekbarThumbnailRef) {
    seekbarRef.addEventListener('mousemove', (event) => {
      this.videoPreviewThumbnails(
        event.offsetX,
        event.clientX,
        player,
        seekbarRef,
        seekbarThumbnailRef,
        options
      )
    })

    // video trick play for touch screen devices-hold and drag
    seekbarRef.addEventListener('touchmove', (event) => {
      player.userActive(true)

      const rect = event.target.getBoundingClientRect()
      const targetTouchX = event.targetTouches[0].pageX - rect.left

      this.videoPreviewThumbnails(
        targetTouchX,
        event.touches[0].clientX,
        player,
        seekbarRef,
        seekbarThumbnailRef,
        options
      )
    })

    // on touch end hide thumbnail
    seekbarRef.addEventListener('touchend', () => {
      seekbarThumbnailRef.style.visibility = 'hidden'
    })

    // video trick play hide on mouse hovered out
    seekbarRef.addEventListener('mouseout', () => {
      seekbarThumbnailRef.style.visibility = 'hidden'
    })

    // Pre loading thumbnail images
    if (options.type === Constants.SPRITE) {
      seekbarThumbnailRef.style.backgroundImage = `url("${options.url}")`
    } else {
      this.videoPreloadedThumbs(options)
      this.preloadThumbnails = []
    }
  }

  videoPreloadedThumbs = async (thumbnailOptions) => {
    const decodedThumbnails = await fetchAndParseVTT(
      thumbnailOptions.thumbnailVtt
    )

    this.preloadThumbnails = await preloadImages(decodedThumbnails)
  }

  videoPreviewThumbnails = async (
    offsetX,
    clientX,
    player,
    seekbarRef,
    seekbarThumbnailRef,
    thumbnailOptions
  ) => {
    const position = (offsetX / seekbarRef.offsetWidth) * 100
    const videoDuration = player.duration()
    const hoveredTime = (videoDuration * position) / 100
    const playerPosition = player.tech_.el_.getBoundingClientRect()
    const interval = Math.floor(hoveredTime / thumbnailOptions.interval)
    const responsive = 600

    const scaleFactor =
      responsive && player.currentWidth() < responsive
        ? player.currentWidth() / responsive
        : 1

    const scaledWidth = scaleFactor * thumbnailOptions.width
    const scaledHeight = scaleFactor * thumbnailOptions.height

    // left boundary for video preview thumbnail
    const leftBoundaryThumbnail =
      clientX -
      (playerPosition.left +
        (seekbarRef.getBoundingClientRect().left - playerPosition.left) +
        scaledWidth / 2)

    // right boundary for video preview thumbnail
    const rightBoundaryThumbnail =
      playerPosition.right -
      (seekbarRef.getBoundingClientRect().left - playerPosition.left) -
      scaledWidth / 2

    // show thumbnail on hovering seekbar and move as mouse moves on the seekbar
    seekbarThumbnailRef.style.visibility = 'visible'
    seekbarThumbnailRef.style.left = `${
      leftBoundaryThumbnail < 0
        ? `${scaledWidth / 2}px`
        : clientX < rightBoundaryThumbnail
        ? `${position}%`
        : `${
            playerPosition.right -
            2 *
              (seekbarRef.getBoundingClientRect().left - playerPosition.left) -
            scaledWidth / 2 -
            playerPosition.left
          }px`
    }`

    seekbarThumbnailRef.innerHTML = `<div class='custom-controls__seekbar-thumbnail-time'>${formatTime(
      hoveredTime
    )}</div>`

    // Map images to thumbnail
    const cleft =
      Math.floor(interval % thumbnailOptions.columns) * -scaledWidth
    const ctop =
      Math.floor(interval / thumbnailOptions.columns) * -scaledHeight

    let currentThumbnail = null

    if (thumbnailOptions.type === Constants.VTT) {
      currentThumbnail = this.preloadThumbnails.find((item) => {
        return (
          timeToSeconds(item.startTime) <= hoveredTime &&
          hoveredTime < timeToSeconds(item.endTime)
        )
      })?.content

      if (currentThumbnail) {
        seekbarThumbnailRef?.appendChild(currentThumbnail)
      }
    }

    const thumbnailStyle = {
      ...(thumbnailOptions.type === Constants.SPRITE
        ? {
            backgroundPosition: `${cleft}px ${ctop}px`,
            backgroundSize: `${scaledWidth * thumbnailOptions.columns}px auto`
          }
        : {}),
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
      display: `${
        hoveredTime > player.duration() || hoveredTime < 0 ? 'none' : 'block'
      }`
    }

    Object.assign(seekbarThumbnailRef.style, thumbnailStyle)
  }
}

export default PreviewThumbnails
