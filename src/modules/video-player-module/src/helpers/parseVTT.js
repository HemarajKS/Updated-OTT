export const fetchAndParseVTT = async (url) => {
  try {
    const response = await fetch(url)
    const vttText = await response.text()
    return parseVTT(vttText)
  } catch (error) {
    console.error('Failed to fetch or parse VTT file:', error)
    return []
  }
}

function parseVTT (vttContent) {
  const cues = vttContent.trim().split(/\r?\n\s*\r?\n/)
  const cueArray = []

  cues.forEach((cue) => {
    const cueComponents = cue.split(/\r?\n/)

    const timeInfo = cueComponents[0].split(' --> ')
    const startTime = timeInfo[0]
    const endTime = timeInfo[1]

    const cueText = cueComponents.slice(1).join('\n')

    if (startTime && endTime) {
      cueArray.push({
        startTime,
        endTime,
        content: cueText
      })
    }
  })

  return cueArray
}
