# Video Player - Reusable Module

## Overview

This project aims to create a reusable video player module that supports JavaScript and most JavaScript frameworks like ReactJS, AngularJS, etc.

## Installation

To use the video player module in your project, follow these steps:

1. Copy the video player module into your project's `src` folder.
2. Install Video.js and videojs-contrib-eme (for DRM) by running the following command:
   `npm i video.js@8.11.8 `
   `npm i videojs-contrib-eme@5.2.0`

3. For React projects:

- Import `ReactVideoPlayer` from the module and use it as follows:

  ```jsx
  import ReactVideoPlayer from 'path/to/ReactVideoPlayer';
  
  <ReactVideoPlayer src={video.url} backIconClick={navigatePreviousPage} />
  ```

4. For Angular projects:

- Import `AngularVideoPlayerComponent` in your app module and use it as follows:
  ```html
  <app-angular-video-player
    [src]="video.url"
    (backIconClick)="navigatePreviousPage()"
  ></app-angular-video-player>
  ```

## Usage

After installation, you can use the video player module in your project by importing it as described above and passing the necessary props or attributes.

## Dependencies

This module has a dependency on [Video.js](https://www.npmjs.com/package/video.js/v/8.11.8). 

And  [videojs-contrib-eme](https://www.npmjs.com/package/videojs-contrib-eme/v/5.1.2) for DRM (Digital rights management).

Make sure to install these using the command mentioned in the Installation section.

## Examples

Here are some examples of how to use the video player module in different frameworks:

- ReactJS:

```jsx
import ReactVideoPlayer from 'path/to/ReactVideoPlayer';

<ReactVideoPlayer src={video.url} backIconClick={navigatePreviousPage} />
```

- AngularJS:

```jsx
<app-angular-video-player
  [src]="video.url"
  (backIconClick)="navigatePreviousPage()"
></app-angular-video-player>
```

## Properties

<table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Required</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>src</td>
          <td>yes</td>
          <td>Video URL</td>
          <td>string</td>
        </tr>
        <tr>
          <td>backIconClick</td>
          <td>yes</td>
          <td>Function to navigate back</td>
          <td>function</td>
        </tr>
        <tr>
          <td>thumbnails</td>
          <td></td>
          <td>
            Preview thumbnails can either be Single image sprites or based on
            VTT file
          </td>
          <td>
            
      
```json
  For VTT based
  {
    "thumbnailVtt": "string",
    "width": "number",
    "height": "number",
    "type": "string"
  }
```

```json
  For single image sprites
  {
    "interval": "number",
    "url": "string",
    "columns": "number",
    "rows": "number",
    "width": "number",
    "height": "number",
    "type": "string"
  }
```

type can be either "VTT" or "SPRITE"

</td>
</tr>
<tr>
<td>title</td>
<td>yes</td>
<td>Title of the Video</td>
<td>string</td>
</tr>
<tr>
<td>subTitle</td>
<td></td>
<td>Sub title of the Video</td>
<td>string</td>
</tr>
<tr>
<td>type</td>
<td>yes (default will be application/x-mpegURL)</td>
<td>Type of video format</td>
<td>string</td>
</tr>
<tr>
<td>drmOptions</td>
<td>null</td>
<td>DRM Key System refer(https://www.npmjs.com/package/videojs-contrib-eme/v/5.1.2)</td>
<td>object</td>
</tr>
</tbody>
</table>

## Features implemented

1. Initial autoplay.
2. Play/pause on click of respective icons in control bar.
3. Forward/Rewind 10 seconds on click of respective icons.
4. Control bar gets automatically hidden after 5 seconds of inactivity.
5. Toggle fullscreen functionality.
6. Added back arrow button to navigate back to previous screen.
7. Seekbar dragging functionality.
8. On video completion pause icon gets replaced with replay icon.
9. Metadata- Title is restricted to 15 characters, and subtitle(optional) is restricted to 30 characters.
10. Audio subtitles features are enabled.
11. Video preview thumbnails above seekbar are displayed by two approaches i.e.,

    a. Single image having sprite images for regular intervals.\
    b. VTT file having image links for time intervals.

12. Custom error handling UI and functionality.
13. Custom loader UI and funactionality.
14. Volume control UI and functionality.
15. Video quality change functionality.
16. Video playback speed control functionality.

## Folder Structure

```
📦video-player-module
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┃ ┗ 📜constants.js
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┣ 📜all-episodes.svg
 ┃ ┃ ┃ ┣ 📜arrow-back.svg
 ┃ ┃ ┃ ┣ 📜captions.svg
 ┃ ┃ ┃ ┣ 📜close.svg
 ┃ ┃ ┃ ┣ 📜error.svg
 ┃ ┃ ┃ ┣ 📜forward.svg
 ┃ ┃ ┃ ┣ 📜fullscreen-exit.svg
 ┃ ┃ ┃ ┣ 📜fullscreen.svg
 ┃ ┃ ┃ ┣ 📜loader.png
 ┃ ┃ ┃ ┣ 📜next-episode.svg
 ┃ ┃ ┃ ┣ 📜pause.svg
 ┃ ┃ ┃ ┣ 📜play.svg
 ┃ ┃ ┃ ┣ 📜replay.svg
 ┃ ┃ ┃ ┣ 📜retry.svg
 ┃ ┃ ┃ ┣ 📜rewind.svg
 ┃ ┃ ┃ ┣ 📜screencast.svg
 ┃ ┃ ┃ ┣ 📜setting.svg
 ┃ ┃ ┃ ┣ 📜tick.svg
 ┃ ┃ ┃ ┗ 📜volume.svg
 ┃ ┃ ┣ 📂strings
 ┃ ┃ ┃ ┗ 📜en.js
 ┃ ┃ ┗ 📂styles
 ┃ ┃ ┃ ┣ 📜error.css
 ┃ ┃ ┃ ┣ 📜icons.css
 ┃ ┃ ┃ ┣ 📜loading.css
 ┃ ┃ ┃ ┣ 📜mobileView.css
 ┃ ┃ ┃ ┣ 📜variables.css
 ┃ ┃ ┃ ┗ 📜video.css
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂functionalities
 ┃ ┃ ┃ ┣ 📜audio-and-subtitles.js
 ┃ ┃ ┃ ┣ 📜errors.js
 ┃ ┃ ┃ ┣ 📜forward-rewind.js
 ┃ ┃ ┃ ┣ 📜full-screen.js
 ┃ ┃ ┃ ┣ 📜icon-toggle.js
 ┃ ┃ ┃ ┣ 📜loading.js
 ┃ ┃ ┃ ┣ 📜play-pause.js
 ┃ ┃ ┃ ┣ 📜playback-speed.js
 ┃ ┃ ┃ ┣ 📜preview-thumbnails.js
 ┃ ┃ ┃ ┣ 📜quality.js
 ┃ ┃ ┃ ┣ 📜seekbar.js
 ┃ ┃ ┃ ┣ 📜slider-ui.js
 ┃ ┃ ┃ ┣ 📜title-subtitle.js
 ┃ ┃ ┃ ┗ 📜volume-control.js
 ┃ ┃ ┣ 📜video-controls.js
 ┃ ┃ ┣ 📜video-custom-ui.js
 ┃ ┃ ┗ 📜video-functionalities.js
 ┃ ┣ 📂helpers
 ┃ ┃ ┣ 📜classes.js
 ┃ ┃ ┣ 📜clickHelpers.js
 ┃ ┃ ┣ 📜parseVTT.js
 ┃ ┃ ┣ 📜preloadImages.js
 ┃ ┃ ┣ 📜switchTab.js
 ┃ ┃ ┣ 📜tabChange.js
 ┃ ┃ ┗ 📜utils.js
 ┃ ┣ 📜AngularVideoPlayer.component.ts  --> Angular Adapter file
 ┃ ┣ 📜ReactVideoPlayer.jsx   --> React Adapter file
 ┃ ┗ 📜video-player.js  --> Entry file
 ┗ 📜README.md
```
