// format time to hh:mm:ss
export const formatTime = (totalSeconds, elapsedSeconds) => {
  const remainingSeconds = elapsedSeconds
    ? totalSeconds - elapsedSeconds
    : totalSeconds

  const hours = Math.floor(remainingSeconds / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = Math.floor(remainingSeconds % 60)

  const formattedHours = (hours < 10 ? '0' + hours : hours) || '00'
  const formattedMinutes = (minutes < 10 ? '0' + minutes : minutes) || '00'
  const formattedSeconds = (seconds < 10 ? '0' + seconds : seconds) || '00'

  return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds
}

// convert to seconds
export const timeToSeconds = (timeStr) => {
  try {
    const [hours, minutes, seconds] = timeStr.split(':').map(parseFloat)
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    return totalSeconds
  } catch (error) {
    console.error('Invalid time format. Please use HH:MM:SS.SS')
    return null
  }
}

// Truncate text
export const truncateText = (text, maxLength) => {
  const truncatedText =
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  return truncatedText
}

// Get CSS variable
export const getStyleFromVariable = (variable) => {
  const root = document.documentElement
  const style = getComputedStyle(root).getPropertyValue(variable).trim()
  return style
}

// check mobile device
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// check iphone

export const isIphone = () => {
  return /iPhone|iPad|Macintosh/i.test(navigator.userAgent)
}
