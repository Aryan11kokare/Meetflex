import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/userActions.js";

export default function History() {
  const authState = useSelector((state) => state.auth);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    setMeetings(authState?.user?.meetings);
  }, [authState?.user_featch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-14 h-14 text-gray-200 animate-spin fill-black"
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
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8  py-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="sm:text-3xl text-2xl  font-bold text-white mb-2">
              Meeting History
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              View all your past meetings and their details
            </p>
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

        <div className="bg-black border border-gray-200 min-h-[70vh] rounded-lg shadow-sm mb-6">
          <div className="divide-y divide-gray-200">
            {meetings?.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
                <p className="text-gray-600">No meetings found</p>
              </div>
            ) : (
              meetings?.map((meeting) => (
                <div
                  key={meeting._id}
                  className="px-6 py-5 hover:bg-slate-800 bg-slate-900 rounded-xl transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <FontAwesomeIcon icon={faVideo} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 ">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {meeting.title}
                          </h3>
                        </div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-sm  text-gray-300 ">
                            {meeting.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(meeting.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(meeting.date)}</span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <span> code : {meeting.meetingId}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
