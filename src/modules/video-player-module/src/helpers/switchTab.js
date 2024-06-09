import IconToggle from '../components/functionalities/icon-toggle'

class SwitchTab extends IconToggle {
  constructor () {
    super()

    const tabElements = document.querySelectorAll(
      '.custom-controls__settings-popover-title'
    )

    const contentElements = document.querySelectorAll(
      '.custom-controls__settings-popover-content'
    )

    tabElements.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabElements.forEach((tab) => {
          this.changeIcon(
            tab,
            [],
            ['custom-controls__settings-popover-title-selected']
          )
        })

        this.changeIcon(
          tab,
          ['custom-controls__settings-popover-title-selected'],
          []
        )

        contentElements.forEach((content) => {
          this.changeIcon(
            content,
            [],
            ['custom-controls__settings-popover-content-show']
          )
        })

        const tabId = tab.getAttribute('data-id')

        const contentElement = document.getElementById(
          `settings-popover-${tabId}`
        )

        if (contentElement) {
          this.changeIcon(
            contentElement,
            ['custom-controls__settings-popover-content-show'],
            []
          )
        }
      })
    })
  }
}

export default SwitchTab
