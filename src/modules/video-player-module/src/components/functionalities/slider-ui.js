class SliderUI {
  updateProgressUI = (progress, element, fillColor, trackColor) => {
    element.style.background = `linear-gradient(to right, ${fillColor} ${progress}%, ${trackColor} ${progress}%)`
  }
}

export default SliderUI
