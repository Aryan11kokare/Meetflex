import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
const Navbar = ({ handleClick }) => {
  return (
    <div className="w-screen py-8 px-10 sm:px-14 flex justify-between items-center  ">
      <div className="flex justify-center items-center">
        <img src={logo} className="h-8 " alt="logo" />
        <span className="text-white font-extrabold text-3xl ml-2">
          Meetflex
        </span>
        <span className="text-blue-600 font-extrabold text-3xl">.</span>
      </div>
      <buttong
        onClick={handleClick}
        className="text-white text-2xl cursor-pointer"
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </buttong>
    </div>
  );
};

export default Navbar;
