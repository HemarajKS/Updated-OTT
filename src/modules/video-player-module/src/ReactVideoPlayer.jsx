/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import VideoPlayer from './video-player'
import '../src/assets/styles/video.css'

const ReactVideoPlayer = ({
  src,
  backIconClick,
  thumbnails,
  title,
  subTitle,
  type,
  textTracks,
  drmOptions
}) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const videoPlayer = new VideoPlayer('#videoPlayer', {
      src,
      backIconClick,
      thumbnails,
      title,
      subTitle,
      type,
      textTracks,
      drmOptions
    })

    return () => {
      videoPlayer.destroy()
    }
  }, [src, backIconClick, thumbnails, title, subTitle, type, textTracks])

  return <div ref={videoRef} id="videoPlayer"></div>
}

export default ReactVideoPlayer
