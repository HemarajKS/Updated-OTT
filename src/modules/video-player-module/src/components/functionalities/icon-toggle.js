class IconToggle {
  changeIcon (iconElement, newIconClass = [], classesToRemove = []) {
    if (newIconClass.length > 0) {
      iconElement?.classList?.add(...newIconClass)
    }
    if (classesToRemove.length > 0) {
      iconElement?.classList?.remove(...classesToRemove)
    }
  }

  performOnClick () {}
}

export default IconToggle
