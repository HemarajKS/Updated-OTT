import { Constants } from '../../assets/constants/constants'
import { truncateText } from '../../helpers/utils'

class TitleSubtitle {
  constructor (title, subTitle) {
    this.titleRef = document.getElementById('custom-controls-top-title')
    this.subtitleRef = document.getElementById('custom-controls-top-sub-title')

    this.displayTitleNSubtitle(title, subTitle)
  }

  displayTitleNSubtitle = (title, subTitle) => {
    if (title) {
      const truncatedTitle = truncateText(title, Constants.TITLE_TEXT_LIMIT)
      this.titleRef.innerHTML = truncatedTitle
    }

    if (subTitle) {
      const truncatedSubtitle = truncateText(
        subTitle,
        Constants.SUB_TITLE_TEXT_LIMIT
      )
      this.subtitleRef.innerHTML = truncatedSubtitle
    }
  }
}

export default TitleSubtitle
