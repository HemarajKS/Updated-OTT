import IconToggle from '../components/functionalities/icon-toggle'

class TabChange extends IconToggle {
  constructor () {
    super()
    const tabElements = document.querySelectorAll(
      '.custom-controls__caption-popover-title'
    )

    const contentElements = document.querySelectorAll(
      '.custom-controls__caption-popover-content'
    )

    tabElements.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabElements.forEach((tab) => {
          this.changeIcon(
            tab,
            [],
            ['custom-controls__caption-popover-title-selected']
          )
        })

        this.changeIcon(
          tab,
          ['custom-controls__caption-popover-title-selected'],
          []
        )

        contentElements.forEach((content) => {
          this.changeIcon(
            content,
            [],
            ['custom-controls__caption-popover-content-show']
          )
        })

        const tabId = tab.getAttribute('data-id')

        const contentElement = document.getElementById(
          `caption-popover-${tabId}`
        )

        if (contentElement) {
          this.changeIcon(
            contentElement,
            ['custom-controls__caption-popover-content-show'],
            []
          )
        }
      })
    })
  }
}

export default TabChange
