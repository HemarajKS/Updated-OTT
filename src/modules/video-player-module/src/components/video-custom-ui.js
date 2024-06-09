import { Text } from '../assets/strings/en'

export const videoCustomUI = (player, isMobileDevice) => {
  const customControlBar = document.createElement('div')
  customControlBar.className = 'custom-control-bar'
  customControlBar.innerHTML = isMobileDevice ? mobileUI() : desktopUI()

  // hidden div to preload icons
  const preloadIconsDiv = document.createElement('div')
  preloadIconsDiv.className = 'preload-icons'
  customControlBar.appendChild(preloadIconsDiv)

  player.el().appendChild(customControlBar)
}

const desktopUI = () =>
  `
<div class="custom-controls-container">
  <div class="custom-controls-container__top-metadata-container">
    <span id="backIcon" class="icon back-icon"></span>
    <div class="custom-controls-container__top-metadata">
      <div
        class="custom-controls__top-metadata__title"
        id="custom-controls-top-title"
      ></div>
      <div
        class="custom-controls__top-metadata__sub-title"
        id="custom-controls-top-sub-title"
      ></div>
    </div>
  </div>
  <div class="custom-controls" id="custom-controls-ref">
    <div class="custom-controls__seek-bar">
      <div class="custom-controls__seek-bar-range">
        <input
          type="range"
          min="0"
          max="100"
          value="0"
          step="0.01"
          id="seek-bar-range"
          class="custom-controls__range-input"
        />
        <div
          class="custom-controls__seekbar-thumbnail"
          id="seek-bar-thumbnail"
        ></div>
      </div>
      <span class="custom-controls__time-duration" id="remaining-time">
        --:--:--
      </span>
    </div>
    <div class="custom-controls__buttons">
      <div class="custom-controls__buttons-group">
        <div class="custom-controls__play-forward-rewind-container">
          <span
            class="custom-controls__forward-rewind icon rewind-icon"
            id="rewindRef"
          >
          </span>
          <span id="play-pause-icon" class="icon pause-icon"></span>
          <span
            class="custom-controls__forward-rewind icon forward-icon"
            id="forwardRef"
          >
          </span>
        </div>
        <span
          id="volume-control-icon"
          class="icon volume-max-icon custom-controls__volume"
        ></span>
      </div>
      <div class="custom-controls__buttons-group-end">
        ${popoverSubtitleUI()}

        <div  id="caption-popover" class="custom-controls__buttons-with-text">
          <span class="icon caption-icon" ></span>
          <span class="custom-controls__buttons-text">${
            Text.audioNSubtitles
          }</span>
        </div>
        ${popoverSettingsUI()}
        <div  id="settings-popover" class="custom-controls__buttons-with-text">
          <span class="icon settings-icon"></span>
          <span class="custom-controls__buttons-text">${Text.settings}</span>
        </div>
        
        <span id="fullscreenRef" class="icon fullscreen-icon"></span>
      </div>
    </div>
  </div>
</div>
`

const mobileUI = () =>
  `
<div class="custom-controls-container custom-controls-container-mobile">
  <div class="custom-controls-container-mobile-top">
    <div class="custom-controls-container-mobile-top-metadata">
      <span id="backIcon" class="icon-mobile back-icon"></span>
      <div class="custom-controls-container__top-metadata-mobile">
        <div
          class="custom-controls__top-metadata__title-mobile"
          id="custom-controls-top-title"
        ></div>
        <div
          class="custom-controls__top-metadata__subtitle-mobile"
          id="custom-controls-top-sub-title"
        ></div>
      </div>
    </div>
    <div class="custom-controls-container-mobile-top-buttons">
      <span id="fullscreenRef" class="icon-mobile fullscreen-icon"></span>
    </div>
  </div>
  <div class="custom-controls-container-mobile-middle">
    <span class="icon-mobile-center rewind-icon" id="rewindRef"> </span>
    <span id="play-pause-icon" class="icon-mobile-center pause-icon"></span>
    <span class="icon-mobile-center forward-icon" id="forwardRef"> </span>
  </div>
  <div class="custom-controls-mobile-bottom" id="custom-controls-ref">
    <div class="custom-controls-mobile-bottom-seekbar-container">
      <div class="custom-controls__seek-bar-range-mobile">
        <input
          type="range"
          min="0"
          max="100"
          value="0"
          step="0.01"
          id="seek-bar-range"
          class="custom-controls__range-input-mobile"
        />
        <div
          class="custom-controls__seekbar-thumbnail-mobile"
          id="seek-bar-thumbnail"
        ></div>
      </div>
      <span class="custom-controls__time-duration-mobile" id="remaining-time">
        --:--:--
      </span>
    </div>
    <div class="custom-controls-mobile-bottom-buttons-container">
      <div class="custom-controls__buttons-group-end-mobile">
        ${popoverSubtitleUIMobile()}
        <div class="custom-controls__buttons-with-text" id="caption-popover">
          <span class="icon-mobile caption-icon"></span>
          <span class="custom-controls__buttons-text"
            >${Text.audioNSubtitles}</span
          >
        </div>

        ${popoverSettingsUIMobile()}
        <div class="custom-controls__buttons-with-text" id="settings-popover">
          <span class="icon-mobile settings-icon"></span>
          <span class="custom-controls__buttons-text">${Text.settings}</span>
        </div>
      </div>
    </div>
  </div>
</div>

`

const popoverSubtitleUI = () => {
  return `
  <div id="caption-popover-ref" class="custom-controls__caption-popover">
  <div class="custom-controls__caption-popover-title-tabs">
    <div
      data-id="audios"
      class="custom-controls__caption-popover-title custom-controls__caption-popover-title-selected"
    >
      ${Text.audio}
      <div
        class="custom-controls__caption-popover-title-selected-underline"
      ></div>
    </div>
    <div data-id="subtitles" class="custom-controls__caption-popover-title">
      ${Text.subtitles}
      <div
        class="custom-controls__caption-popover-title-selected-underline"
      ></div>
    </div>
    <div class="custom-controls__caption-popover-tabs-underline"></div>
  </div>
  <div class="custom-controls__caption-popover-title-tabs-body">
    <div
      id="caption-popover-audios"
      class="custom-controls__caption-popover-content custom-controls__caption-popover-content-show"
    ></div>
    <div
      id="caption-popover-subtitles"
      class="custom-controls__caption-popover-content"
    ></div>
  </div>
</div>
 `
}

const popoverSettingsUI = () => {
  return `
  <div id="settings-popover-ref" class="custom-controls__settings-popover">
  <div class="custom-controls__settings-popover-title-tabs">
    <div
      data-id="quality"
      class="custom-controls__settings-popover-title custom-controls__settings-popover-title-selected"
    >
      ${Text.quality}
      <div
        class="custom-controls__settings-popover-title-selected-underline"
      ></div>
    </div>
    <div data-id="speed" class="custom-controls__settings-popover-title">
      ${Text.speed}
      <div
        class="custom-controls__settings-popover-title-selected-underline"
      ></div>
    </div>
    <div class="custom-controls__settings-popover-tabs-underline"></div>
  </div>
  <div class="custom-controls__settings-popover-title-tabs-body">
    <div
      id="settings-popover-quality"
      class="custom-controls__settings-popover-content custom-controls__settings-popover-content-show"
    ></div>
    <div
      id="settings-popover-speed"
      class="custom-controls__settings-popover-content custom-controls__settings-popover-content-playback-speed"
    ></div>
  </div>
</div>

`
}

const popoverSubtitleUIMobile = () => {
  return `
  <div id="caption-popover-ref" class="custom-controls__caption-popover-mobile">
  <div class="custom-controls__caption-popover-title-tabs-mobile">
    <div data-id="audios" class="custom-controls__caption-popover-title custom-controls__popover-popover-title-mobile custom-controls__caption-popover-title-selected" >
      ${Text.audio}
      <div class="custom-controls__caption-popover-title-selected-underline"></div>
    </div>
    <div
      data-id="subtitles"
      class="custom-controls__caption-popover-title custom-controls__popover-popover-title-mobile"
    >
      ${Text.subtitles}
      <div class="custom-controls__caption-popover-title-selected-underline"></div>
    </div>
    <div class="custom-controls__caption-popover-tabs-underline"></div>
    <div class="close-icon icon-mobile custom-controls__caption-popover-close-icon" id="custom-controls-caption-popover-close"></div>
  </div>
  <div class="custom-controls__caption-popover-title-tabs-body">
    <div
      id="caption-popover-audios"
      
      class="custom-controls__caption-popover-content custom-controls__caption-popover-content-show"
    ></div>
    <div
      id="caption-popover-subtitles"
      class="custom-controls__caption-popover-content "
    ></div>
  </div>
</div>
`
}

const popoverSettingsUIMobile = () => {
  return `
  <div id="settings-popover-ref" class="custom-controls__settings-popover-mobile">
  <div class="custom-controls__settings-popover-title-tabs-mobile">
    <div
      data-id="quality"
      class="custom-controls__settings-popover-title custom-controls__settings-popover-title-mobile custom-controls__settings-popover-title-selected"
    >
      ${Text.quality}
      <div
        class="custom-controls__settings-popover-title-selected-underline"
      ></div>
    </div>
    <div
      data-id="speed"
      class="custom-controls__settings-popover-title custom-controls__settings-popover-title-mobile"
    >
      ${Text.speed}
      <div
        class="custom-controls__settings-popover-title-selected-underline"
      ></div>
    </div>
    <div class="custom-controls__settings-popover-tabs-underline"></div>
    <div
      class="close-icon icon-mobile custom-controls__settings-popover-close-icon"
      id="custom-controls-popover-close"
    ></div>
  </div>
  <div class="custom-controls__settings-popover-title-tabs-body">
    <div
      id="settings-popover-quality"
      class="custom-controls__settings-popover-content custom-controls__settings-popover-content-show"
    ></div>
    <div
      id="settings-popover-speed"
      class="custom-controls__settings-popover-content custom-controls__settings-popover-content-playback-speed-mobile"
    ></div>
  </div>
</div>

`
}

export const popoverItemsUI = (label, condition, id) => `
<div class="custom-controls__caption-popover-option ${
  condition ? 'custom-controls__caption-popover-option-selected tick-icon' : ''
}" id="${id || ''}">
  ${label} 
</div>`

export const settingsPopoverItemsUI = (label, condition, id) => `
<div class="custom-controls__settings-popover-option ${
  condition ? 'custom-controls__settings-popover-option-selected tick-icon' : ''
}" id="${id || ''}">
    ${label}
</div>`

export const speedPopoverSlider = (label, condition, id) => {
  return `
  <div class="custom-controls__playback-speed-popover-option ${
    condition ? 'custom-controls__playback-speed-popover-option-selected' : ''
  }" id="${id || ''}">
  <div class="custom-controls__playback-speed-popover-option-label">
    ${label}
  </div>
</div>`
}

export const speedPopoverSliderMobile = (label, condition, id) => {
  return `
  <div class="custom-controls__playback-speed-popover-option ${
    condition ? 'custom-controls__playback-speed-popover-option-selected' : ''
  }" id="${id || ''}">
  <div class="custom-controls__playback-speed-popover-option-label">
    ${label}
  </div>
</div>`
}

export const loadingScreenUI = () => {
  return `
    <div class="custom-controls__loading-screen" id="custom-player-loader">
      <div class="custom-controls__loading-screen-loader">
      </div>
    </div>`
}

export const videoErrorsUI = (error) => {
  return `
  <div class="custom-controls__error-screen" id="custom-player-error">
  <div class="close-icon icon custom-controls__error-screen-close-icon" id="custom-controls-error-close"></div>
  <div class="custom-controls__error-screen-content">
    <div class="custom-controls__error-icon error-icon"></div>
    <div class="custom-controls__error-message">
      ${error || Text.errorMessages.GEN_ERR_MESSAGE}
    </div>
    <div class="custom-controls__error-info">${Text.errorInfo}</div>
    <button class="custom-controls__error-button" id="custom-player-error-tryagain-btn">
      <span class="retry-icon retry-icon-style"></span>
      <span>${Text.tryAgain}</span>
    </button>
  </div>
</div>`
}

export const videoErrorsUIMobile = (error) => {
  return `
  <div class="custom-controls__error-screen-mobile" id="custom-player-error">
  <div class="close-icon icon-mobile custom-controls__error-screen-close-icon-mobile" id="custom-controls-error-close"></div>
  <div class="custom-controls__error-screen-content-mobile">
    <div class="custom-controls__error-icon-mobile error-icon"></div>
    <div class="custom-controls__error-message-mobile">
      ${error || Text.errorMessages.GEN_ERR_MESSAGE}
    </div>
    <div class="custom-controls__error-info-mobile">${Text.errorInfo}</div>
    <button class="custom-controls__error-button-mobile" id="custom-player-error-tryagain-btn">
      <span class="retry-icon retry-icon-style-mobile"></span>
      <span>${Text.tryAgain}</span>
    </button>
  </div>
</div>`
}

export const volumeControlUI = () => `
  <div class="custom-controls__volume-control" id="volume-control-popover">
    <input
      type="range"
      min="0"
      max="1"
      value="0"
      step="0.01"
      id="volume-control-range"
      class="custom-controls__volume-control-slider "
    />
  </div>`
