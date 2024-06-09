// AngularVideoPlayer.component.ts
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
// @ts-ignore
import VideoPlayer from "./video-player";

@Component({
  selector: "app-angular-video-player",
  template: '<div id="videoSelector"></div>',
  standalone: true,
  styleUrls: ["../src/styles/video.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AngularVideoPlayerComponent implements OnInit, OnDestroy {
  @Input() src: string = "";
  @Input() backIconClick: any;
  @Input() thumbnails: any;
  @Input() title: string = "";
  @Input() subTitle: string = "";
  @Input() type: string | undefined = "";
  @Input() textTracks: [] | undefined = [];

  private videoContainer: any;
  private videoPlayer: VideoPlayer;

  constructor() {}

  ngOnInit() {
    this.videoContainer = "#videoSelector";
    this.videoPlayer = new VideoPlayer(this.videoContainer, {
      src: this.src,
      backIconClick: this.backIconClick,
      thumbnails: this.thumbnails,
      title: this.title,
      subTitle: this.subTitle,
      type: this.type,
      textTracks: this.textTracks,
    });
  }

  ngOnDestroy() {
    this.videoPlayer.destroy();
  }
}
