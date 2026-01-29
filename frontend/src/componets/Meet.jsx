import {
  faArrowLeft,
  faMicrophone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMeeting } from "../../redux/actions/meetingActions.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Meet = ({ handleSubmit, setUsername, username, localVideoRef }) => {
  const meetingState = useSelector((state) => state.meeting);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = window.location.href.split("/")[4];

  const featchMeeting = async () => {
    setLoading(true);
    await dispatch(getMeeting({ meetingCode: path }));
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    featchMeeting();
  }, []);

  useGSAP(() => {
    let tl = gsap.timeline();

    tl.from(".el", {
      x: 200,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
    });

    tl.from(".rightDiv", {
      x: 200,
      opacity: 0,
      duration: 1,
    });
  }, [loading]);

  useEffect(() => {
    if (meetingState.isError === true) {
      navigate("/");
    }
  }, [meetingState.isError]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center  items-center bg-black">
        <div role="status" className="overflow-hidden">
          <svg
            aria-hidden="true"
            className="w-14 h-14 text-blue-300 fill-blue-600 animate-spin fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      <div className="w-screen py-8 px-10 sm:px-20 flex justify-between h-[12vh] sm:h-[20vh]">
        <div className="flex justify-center items-center">
          <span className="text-white font-extrabold text-3xl">Meetflex</span>
          <span className="text-blue-600 font-extrabold text-3xl">.</span>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-white cursor-pointer text-2xl"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div className="w-screen sm:h-[80vh]  sm:flex justify-center items-center p-10 sm:px-20">
        <div className="sm:h-full sm:w-[50%] sm:p-10">
          <video
            ref={localVideoRef}
            muted
            autoPlay
            className="rounded-3xl  sm:h-full h-[18rem] w-[22rem] bg-black sm:w-full object-cover"
          ></video>
        </div>
        <form
          onSubmit={handleSubmit}
          className="sm:h-full sm:w-[50%]  mt-6 sm:mt-0  sm:p-10 flex flex-col justify-center items-center"
        >
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block el text-lg font-medium text-white"
            >
              Your Name
            </label>
            <div className="relative el">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-white placeholder-gray-300"
              />
            </div>
          </div>
          <br />
          <div className="w-full el">
            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 group"
            >
              <span>Join Meeting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          <br />
          <hr className=" el w-full " />
          <br />
          <div className="flex el justify-center items-center gap-20  text-sm">
            <p>
              MeetFlex is a modern, fast, and secure video conferencing platform
              designed to make virtual meetings seamless and engaging
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Meet;
