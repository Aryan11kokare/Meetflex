import { useState } from "react";
import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";
import bannerImg from "../assets/finalimage.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Footer from "../componets/Footer";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useGSAP(() => {
    let tl = gsap.timeline();

    tl.from(".el", {
      x: -200,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
    });

    tl.from(".rightDiv", {
      x: 200,
      opacity: 0,
      duration: 0.7,
    });
  }, [loading]);

  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="min-h-screen bg-black text-white">
      <Navbar handleClick={handleClick} />
      {isOpen === true ? <Sidebar handleClick={handleClick} /> : null}

      <div className="px-10 min-h-[80vh]  sm:h-[65vh] sm:flex xl:mt-4  sm:justify-center sm:items-center sm:px-14 ">
        <div className="leftDiv flex h-full flex-col gap-8 sm:gap-4 mt-28 sm:mt-0 sm:justify-center sm:items-start sm:w-[50vw]  ">
          <h1 className="el font-extrabold text-4xl text-balance overflow-hidden sm:text-5xl 2xl:text-6xl sm:text-start">
            Welcome to the video conferencing platform
          </h1>
          <p className="el font-medium text-gray-300 text-xl sm:text-xl  text-start">
            Bring your team together anytime, anywhere with smooth, high quality
            video meetings that just work.
          </p>
          <hr className="w-full el my-2" />
          <div className="w-full el">
            <button
              onClick={() => {
                navigate("/meet");
              }}
              className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-blue-800 shadow-lg shadow-blue-800/80 font-medium rounded-base text-xl rounded-xl px-4 py-4 text-center leading-5"
            >
              Create the Meeting &nbsp;
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className="rightDiv hidden  h-full  sm:flex gap-2 justify-center items-center w-[50vw]  ">
          <img
            src={bannerImg}
            alt=""
            className="object-contain h-[24rem] w-[24rem] "
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
