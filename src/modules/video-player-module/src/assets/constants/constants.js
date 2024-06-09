import { Text } from '../strings/en'

export const Constants = {
  FORWARD: 'FORWARD',
  REWIND: 'REWIND',
  FORWARD_SEEK: 10,
  REWIND_SEEK: 10,
  TITLE_TEXT_LIMIT: 25,
  SUB_TITLE_TEXT_LIMIT: 40,
  VTT: 'VTT',
  SPRITE: 'SPRITE',
  SUBTITLES: 'subtitles',
  CAPTIONS: 'captions',
  DISABLED: 'disabled',
  SHOWING: 'showing',
  DISABLE_CAPTIONS: 'disable_captions',
  TEXT_TRACK_ID_PREFIX: 'textTrackId',
  AUDIO_TRACK_ID_PREFIX: 'audioTrackId',
  QUALITY_ID_PREFIX: 'qualityTrackId',
  QUALITY_SUFFIX: 'p',
  playbackSpeeds: [
    { label: '0.5x', value: 0.5 },
    { label: '0.75x', value: 0.75 },
    { label: '1x (Normal)', value: 1 },
    { label: '1.25x', value: 1.25 },
    { label: '1.5x', value: 1.5 }
  ],
  SPEED_ID_PREFIX: 'speedId',
  AUTO: 'auto',
  MOBILE_SCREEN_WIDTH: 576,
  errorMessages: {
    1: Text.errorMessages.MEDIA_ERR_ABORTED,
    2: Text.errorMessages.MEDIA_ERR_NETWORK,
    3: Text.errorMessages.MEDIA_ERR_DECODE,
    4: Text.errorMessages.MEDIA_ERR_SRC_NOT_SUPPORTED,
    5: Text.errorMessages.MEDIA_ERR_ENCRYPTED,
    unknown: Text.errorMessages.UNKNOWN
  }
}
