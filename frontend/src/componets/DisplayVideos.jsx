import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mic, MicOff, VideoOff } from "lucide-react";
import { useState } from "react";

const DisplayVideos = ({ videos }) => {
  const [fullscreenVideoId, setFullscreenVideoId] = useState(null);

  const handleDoubleClick = (id) => {
    setFullscreenVideoId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex-1 p-6 min-h-screen bg-black">
      <div
        className={`sm:h-full ${
          fullscreenVideoId === null
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-8"
            : "fixed inset-0 bg-black"
        }`}
      >
        {(fullscreenVideoId
          ? videos.filter((v) => v.socketId === fullscreenVideoId)
          : videos
        ).map((video) => (
          <div
            key={video.socketId}
            onDoubleClick={() => handleDoubleClick(video.socketId)}
            className={`relative bg-gradient-to-br from-gray-100 to-gray-200
              overflow-hidden shadow-sm hover:shadow-md sm:w-[25rem]  sm:h-[18rem]  h-[16rem]  transition-shadow duration-200 group
              ${
                fullscreenVideoId === video.socketId
                  ? "sm:w-full sm:h-full "
                  : "rounded-xl"
              }`}
          >
            {video.videoEnabled ? (
              <video
                autoPlay
                playsInline
                className={`${
                  fullscreenVideoId === video.socketId
                    ? "sm:w-full sm:h-full object-cover border border-white"
                    : " w-full h-full   object-cover rounded-xl"
                }`}
                ref={(el) => el && (el.srcObject = video.stream)}
              />
            ) : (
              <div
                className={`${
                  fullscreenVideoId === video.socketId
                    ? "w-full h-full"
                    : " h-full rounded-xl"
                } border bg-black text-white p-4 flex flex-col justify-center items-center`}
              >
                <FontAwesomeIcon icon={faUser} className="text-8xl" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-white ${
                    fullscreenVideoId === video.socketId
                      ? " font-bold text-2xl "
                      : " font-medium text-sm"
                  }`}
                >
                  {video.username}
                </span>

                <div
                  className={`p-1.5  ${
                    fullscreenVideoId === video.socketId ? "p-6 " : "p-1.5 "
                  } rounded-full ${
                    video.audioEnabled === false ? "bg-red-500" : "bg-gray-800"
                  }`}
                >
                  {video.audioEnabled === false ? (
                    <MicOff
                      className={` ${
                        fullscreenVideoId === video.socketId
                          ? "w-5 h-5"
                          : "w-3.5 h-3.5"
                      } text-white`}
                    />
                  ) : (
                    <Mic
                      className={` ${
                        fullscreenVideoId === video.socketId
                          ? "w-5 h-5"
                          : "w-3.5 h-3.5"
                      } text-white`}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayVideos;
