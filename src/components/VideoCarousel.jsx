import { hightlightsSlides } from "../constants/index.js";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";

export const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoandedData] = useState();
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({ ...pre, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoID]);

  const handleLoadedMetaData = (i, e) => setLoandedData((pre) => [...pre, e]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);
  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.cuurent;
    if (span[videoId]) {
      //animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      //   case "pause":
      //     setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
      //     break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      default:
        return video;
    }

    return (
      <>
        <div className="flex items-center">
          {hightlightsSlides.map((list, i) => (
            <div id="slider" key={list.id} className="sm:pr-20 pr-10">
              <div className="video-carousel_container">
                <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                  <video
                    id="video"
                    playsInline={true}
                    preload="auto"
                    muted
                    ref={(el) => (videoRef.current[i] = el)}
                    onPlay={(prevVideo) => ({ ...prevVideo, isPlaying: true })}
                  >
                    <source src={list.video}></source>
                  </video>
                </div>
                <div className="absolute top-12 left-[5%] z-10">
                  {list.textLists.map((text) => (
                    <p key={text} className="md:text-2xl text-xl font-medium">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex-center mt-10 ">
          <div className="flex-centeer px-7 py-5 bg-gray-300 backdrop-blur rounded-full">
            {videoRef.current.map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  videoDivRef.current[i] = el;
                }}
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              >
                <span
                  className="absolute h-full w-full rounded-full "
                  ref={(el) => {
                    videoDivRef.current[i] = el;
                  }}
                />
              </span>
            ))}
          </div>
          <div className="control-btn">
            <img
              src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
              alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
              onClick={
                isLastVideo
                  ? () => handleProcess("video-reset")
                  : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
              }
            />
          </div>
        </div>
      </>
    );
  };
};

export default VideoCarousel;
