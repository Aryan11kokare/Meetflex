import { useEffect, useState } from "react";
import { Plus, LogIn, Copy } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createMeeting,
  deleteMeeting,
  userMeetings,
} from "../../redux/actions/meetingActions";
import { MeetingCard } from "../componets/MeetingCard.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const meetingState = useSelector((state) => state.meeting);
  const [meetingCode, setMeetingCode] = useState();
  const [meetings, setMeetings] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [duration, setDuration] = useState();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigator = () => {
    navigate(`/meet/${meetingCode}`);
  };

  const featchMeetings = async () => {
    setLoading(true);
    const responce = await dispatch(userMeetings());
    if (responce.payload.name === "JsonWebTokenError") {
      await localStorage.removeItem("token");
      navigate("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    featchMeetings();
  }, []);

  useEffect(() => {
    setMeetings(meetingState?.meetings);
    console.log("hit ");
  }, [meetingState?.meetings]);

  const handleDelete = async (id) => {
    setLoading(true);
    await dispatch(deleteMeeting({ meetingId: id }));
    const newMeetings = meetings.filter((el) => el._id !== id);
    setMeetings(newMeetings);
    await dispatch(userMeetings());
    setLoading(false);
  };

  const genrateMeetingCode = async () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$*!?1234567890".split("");
    let result = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
    }

    setMeetingCode(result);
  };

  const handleCreateMeeting = async () => {
    setLoading(true);
    await dispatch(
      createMeeting({ date, time, duration, title, meetingCode, description }),
    );
    setDate("");
    setTime("");
    setDuration("");
    setTitle("");
    setDescription("");
    setShowNewMeetingModal(false);
    await dispatch(userMeetings());
    setLoading(false);
  };

  useGSAP(() => {
    gsap.from("#leftdiv", {
      y: -250,
      opacity: -2,
      duration: 2.5,
      ease: "elastic.out(1,0.3)",
    });

    gsap.from("#rightdiv", {
      y: 250,
      opacity: -2,
      duration: 2.5,
      ease: "elastic.out(1,0.3)",
    });
  }, [loading]);

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
    <div className=" h-screen text-white bg-black overflow-x-hidden">
      <div className=" py-8 px-10 sm:px-20 flex justify-between">
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

      <main className="max-w-7xl mx-auto px-10 sm:px-20 py-12">
        <div className="grid lg:grid-cols-2 gap-8 overflow-hidden mb-12">
          <div
            id="leftdiv"
            className=" bg-black border border-gray-100 rounded-2xl p-8  transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">New Meeting</h2>
                <p className="text-gray-200 text-sm">
                  Start an instant meeting
                </p>
              </div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-black" />
              </div>
            </div>
            <button
              onClick={() => {
                setShowNewMeetingModal(true);
                genrateMeetingCode();
              }}
              className="w-full bg-gray-100 text-black font-medium py-4 rounded-xl hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Meeting
            </button>
          </div>

          <div
            id="rightdiv"
            className="bg-black border border-slate-200 rounded-2xl p-8 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Join Meeting</h2>
                <p className="text-gray-200 text-sm">
                  Connect via meeting code
                </p>
              </div>
              <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center">
                <LogIn className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter meeting code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                className="w-full bg-white border text-black border-gray-700 rounded-xl px-4 py-4 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-600"
              />
              <button
                onClick={handleNavigator}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-blue-800  shadow-lg shadow-blue-800/80 font-bold w-full rounded-xl text-base  px-4 py-4 text-center leading-5"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </main>

      <hr className="sm:mx-20 mx-10 my-4" />
      <div className="px-10 sm:px-20">
        {meetings.map((el, index) => (
          <MeetingCard key={index} meeting={el} handleDelete={handleDelete} />
        ))}
      </div>

      {showNewMeetingModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleCreateMeeting}
            className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900   border border-gray-800 rounded-2xl p-8 max-w-md w-full text-white"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Create New Meeting</h2>
              <button
                type="button"
                onClick={() => setShowNewMeetingModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Meeting Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter meeting title"
                  required
                  className="w-full bg-slate-200 text-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-600"
                />
              </div>
              <div className="space-y-4 ">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  required
                  className="w-full bg-slate-200 text-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-600"
                  placeholder="Add meeting description "
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-200 text-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    required
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-200 text-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Duration
                </label>
                <select
                  required
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-200 text-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                >
                  <option value={"30 minutes"}>30 minutes</option>
                  <option value={"1 hour"}>1 hour</option>
                  <option value={"2 hours"}>2 hours</option>
                  <option value={"3 hours"}>3 hours</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowNewMeetingModal(false)}
                className="flex-1 bg-gray-100 text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-3 text-center leading-5"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
