"use client";
import React from "react";
import ReactVideoPlayer from "@/modules/video-player-module/src/ReactVideoPlayer";
import { useRouter } from "next/navigation";

const TvShows = () => {
  const router = useRouter();

  const video = {
    id: 1,
    name: "Video 1",
    url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    thumbnailUrl: "https://source.unsplash.com/random/900×700/?movie",
    kind: "series",
    subtitle: "Episode 1",
    title: "Series",
    duration: "14m 48s",
    previewThumbnail: {
      thumbnailVtt: "/Thumbnails/1/1.vtt",
      width: 160,
      height: 90,
      type: "VTT",
    },
  };

  const navigatePreviousPage = () => {
    router.back();
  };

  return (
    <div className="border border-gray">
      <ReactVideoPlayer
        src={video.url}
        backIconClick={navigatePreviousPage}
        thumbnails={video.previewThumbnail}
        title={video.title}
        subTitle={video.subtitle}
        type={undefined}
        textTracks={undefined}
        drmOptions={undefined}
      />
    </div>
  );
};

export default TvShows;
