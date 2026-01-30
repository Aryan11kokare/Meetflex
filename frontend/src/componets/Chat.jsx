import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileImage,
  faFileVideo,
  faPaperclip,
  faPaperPlane,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL, clientServer } from "../../redux";

const Chat = ({ messages, socket, username, tooglechat }) => {
  const [message, setMessage] = useState("");
  const [fileContent, setFileContent] = useState();
  const [isFile, setIsFile] = useState(false);
  const [type, setType] = useState("");
  const [media, setMedia] = useState(false);

  const handleSendMessages = async () => {
    if (isFile === false) {
      if (message !== "") {
        socket.emit("chat_message", { type: type, data: message }, username);
        setMessage("");
        setType("");
      }
    }

    if (isFile === true) {
      const formData = new FormData();
      formData.append("media", fileContent);
      const responce = await clientServer.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await socket.emit(
        "chat_message",
        { type: type, data: responce.data.filename },
        username,
      );
      setIsFile(false);
      setMedia(false);
      setType("");
    }
  };

  const renderMessage = (message) => {
    switch (message.type) {
      case "image":
        return (
          <>
            <p className="text-xs text-blue-400">{message.sender}</p>
            <div className="bg-slate-700 rounded-xl p-2 h-[40% ] w-[60%] mb-4 mt-1">
              <div className="text-base">
                <img
                  src={`${BASE_URL}/${message?.data}`}
                  alt="Uploaded"
                  className=" rounded-xl shadow-md hover:shadow-lg transition-shadow"
                />
              </div>
            </div>
          </>
        );
      case "video":
        return (
          <>
            <p className="text-xs text-blue-400">{message.sender}</p>
            <div className="bg-slate-700 rounded-xl h-[45% ] w-[65%] p-2 my-4">
              <div className="">
                <video
                  src={`${BASE_URL}/${message?.data}`}
                  controls
                  className=" rounded-xl shadow-md"
                />
              </div>
            </div>
          </>
        );
      case "pdf":
        return (
          <>
            <p className="text-xs text-blue-400">{message.sender}</p>
            <div className="w-[80%] bg-slate-700 rounded-xl p-2 my-4 ">
              <a
                href={`${BASE_URL}/${message?.data}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-indigo-200 bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all backdrop-blur-sm"
              >
                <FontAwesomeIcon icon={faFile} />
                <span className="text-sm font-medium">{message.data}</span>
              </a>
            </div>
          </>
        );
      default:
        return (
          <>
            <p className="text-xs text-blue-400">{message.sender}</p>
            <div className="bg-slate-700 text-white rounded-lg p-2 mb-4 mt-1 w-[80%]">
              <p className="text-sm">{message.data}</p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed right-0 bottom-0 top-0  shadow-xl w-full  sm:w-[40vw] z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900    text-black h-screen ">
      <div className="w-full h-[15vh] bg-gray-900/80 border-b overflow-y-hidden border-gray-800 shadow-sm   px-6 py-5">
        <div className=" flex items-center justify-between ">
          <div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>

            <p className="text-sm text-slate-300 mt-1">
              Stay connected with your team
            </p>
          </div>

          <button
            onClick={tooglechat}
            className="flex items-center gap-2 p-3 text-sm bg-blue-500 text-white rounded-full"
          >
            <FontAwesomeIcon icon={faRemove} />
          </button>
        </div>
      </div>

      {messages?.length === 0 ? (
        <div className="w-full h-[75vh] flex justify-center text-gray-400 items-center py-2 px-4 ">
          No messages Yet
        </div>
      ) : (
        <div
          onClick={() => setMedia(false)}
          className="w-full h-[75vh] overflow-y-scroll py-2 px-4 "
        >
          {messages?.map((message) => renderMessage(message))}
        </div>
      )}

      <div className=" h-[10vh]  overflow-y-hidden shadow-sm border-t border-gray-800 bg-gray-900/50  px-2 py-3">
        <div className="flex items-center justify-between gap-1 bg-gray-800 text-gray-100 rounded-xl ">
          <button
            onClick={() => [setMedia((c) => !c)]}
            className="flex items-center text-lg gap-2 px-2 rounded-full"
          >
            <FontAwesomeIcon icon={faPaperclip} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" w-[80%] text-base py-2 px-4   font-extralight focus:outline-none"
            placeholder="Type something "
          />
          <button
            onClick={handleSendMessages}
            className="flex items-center gap-2 bg-blue-500 text-white p-3 text-lg rounded-xl"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
      {media === true ? (
        <div
          className="fixed flex flex-col justify-center items-center gap-2 bottom-26 ml-2 sm:bottom-18 sm:right-100 h-48 rounded-xl w-24 p-2 
          shadow-md border border-t border-gray-600 bg-gray-900/50"
        >
          <button
            onClick={() => document.getElementById("fileImage").click()}
            className="p-2 flex gap-1 text-sm justify-center items-center rounded-full text-white bg-blue-500"
          >
            <FontAwesomeIcon icon={faFileImage} /> <span>Image</span>
          </button>
          <button
            onClick={() => document.getElementById("fileVideo").click()}
            className="p-2 flex gap-1 text-sm justify-center items-center rounded-full text-white bg-blue-500"
          >
            <FontAwesomeIcon icon={faFileVideo} /> <span>video</span>
          </button>
          <button
            onClick={() => document.getElementById("filePdf").click()}
            className="p-2 flex gap-1 text-sm  justify-center items-center rounded-full text-white bg-blue-500 w-full"
          >
            <FontAwesomeIcon icon={faFile} /> <span>PDF</span>
          </button>
          <input
            id="fileImage"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setFileContent(e.target.files[0]);
              setType("image");
              setIsFile(true);
            }}
          />

          <input
            id="fileVideo"
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => {
              setFileContent(e.target.files[0]);
              setType("video");
              setIsFile(true);
            }}
          />

          <input
            id="filePdf"
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => {
              setFileContent(e.target.files[0]);
              setType("pdf");
              setIsFile(true);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Chat;
