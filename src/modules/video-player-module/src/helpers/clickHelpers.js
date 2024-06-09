class HandleClicks {
  toggleCaptionPopover (contentRef) {
    if (contentRef.style.visibility === 'visible') {
      contentRef.style.opacity = '0'
      contentRef.style.visibility = 'hidden'
    } else {
      contentRef.style.visibility = 'visible'
      contentRef.style.opacity = '1'
    }
  }

  hidePopoverOutsideClick (event, buttonRef, contentRef) {
    if (!buttonRef.contains(event.target)) {
      if (!contentRef.contains(event.target)) {
        contentRef.style.visibility = 'hidden'
        contentRef.style.opacity = '0'
      }
    }
  }
}

export default HandleClicks
