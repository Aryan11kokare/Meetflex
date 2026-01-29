import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
const Navbar = ({ handleClick }) => {
  return (
    <div className="w-screen py-8 px-10 sm:px-14 flex justify-between items-center  ">
      <div className="flex justify-center items-center">
        <span className="text-white font-extrabold text-3xl">Meetflex</span>
        <span className="text-blue-600 font-extrabold text-3xl">.</span>
      </div>
      <button
        onClick={handleClick}
        className="text-white text-2xl cursor-pointer"
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </button>
    </div>
  );
};

export default Navbar;
