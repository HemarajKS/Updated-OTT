"use client";
import React from "react";
import ReactVideoPlayer from "@/modules/video-player-module/src/ReactVideoPlayer";
import { useRouter } from "next/navigation";

const Movies = () => {
  const router = useRouter();

  const video = {
    id: 7,
    name: "Local Test Video",
    thumbnailUrl: "https://source.unsplash.com/random/900×700/?video",
    kind: "movie",
    title: "Movie",
    duration: "9m 56s",
    url: "/test/bigbuckbunny.m3u8",
    previewThumbnail: {
      thumbnailVtt: "/Thumbnails/4/4.vtt",
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
        subTitle={undefined}
        type={undefined}
        textTracks={undefined}
        drmOptions={undefined}
      />
    </div>
  );
};

export default Movies;
