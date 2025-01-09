import "../../styles/Navbar.css";
import MobileMenu from "./MobileMenu";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHome, IoHomeOutline} from "react-icons/io5";
import { IoIosInformationCircle, IoIosInformationCircleOutline } from "react-icons/io";
import { HiMiniWrench, HiOutlineWrench } from "react-icons/hi2";
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";
import { IoChatboxEllipses, IoChatboxEllipsesOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineSetting, AiFillSetting } from "react-icons/ai";

function Navbar({ isOpen, setIsOpen }: any) {
  const navigate = useNavigate();
	const { user, logout } = useContext(AuthContext);

  let path = location.pathname;
  path = path.substring(1, path.length);

  // Logout handler
	const handleLogout = () => {
		logout(); // Brise token i user data iz AuthContext
		navigate("/"); // vraca na pocetak
	};

  return (
    <div className="navbar-container sticky top-0 z-50">
      <div className="name w-[35%] md:w-[20%]">
        <h4>
          <strong>SportConnect</strong>
        </h4>
      </div>

      <div className="navbar-links hidden md:flex w-[65%] text-lg mt-[5.5rem] justify-between">
        {/*LINKS*/}
        <div className="flex ml-[30px] gap-7">
          <Link
            to="/main-page"
            className="flex items-center gap-1 group"
            state={{fromMainPage: true }}
          >
            <IoHomeOutline
              size={25}
              className="small-icons group-hover:hidden"
            />
            <IoHome
              size={25}
              className="small-icons hidden group-hover:block"
            />
            <span className="font-semibold">Home</span>
          </Link>

          <Link
            to={"/about-us?" + path}
            className="flex items-center gap-1 group"
            state={{fromMainPage: true }}
          >
            <IoIosInformationCircleOutline 
              size={30}
              className="small-icons group-hover:hidden"
            />
            <IoIosInformationCircle 
              size={30}
              className="small-icons hidden group-hover:block"
            />
            <span className="font-semibold">About</span>
          </Link>

          <Link
            to={"/terms-of-service?" + path}
            className="flex items-center gap-1 group"
            state={{fromMainPage: true }}
          >
            <HiOutlineWrench
              size={27}
              className="small-icons group-hover:hidden"
            />
            <HiMiniWrench 
              size={27}
              className="small-icons hidden group-hover:block"
            />
            <span className="font-semibold">Services</span>
          </Link>

          <Link
            to={"/pricing?" + path}
            className="flex items-center gap-1 group"
            state={{fromMainPage: true }}
          >
            <AiOutlineDollar 
              size={27}
              className="small-icons group-hover:hidden"
            />

            <AiFillDollarCircle 
              size={27}
              className="small-icons hidden group-hover:block"
            />
            <span className="font-semibold">Pricing</span>
          </Link>

          {/* Admin link */}
          {user?.email === 'vid123@gmail.com' && (
            <Link
              to={"/admin"}
              className="flex items-center gap-1 group"
            >
              <AiOutlineSetting 
                size={27}
                className="small-icons group-hover:hidden"
              />
              <AiFillSetting
                size={27}
                className="small-icons hidden group-hover:block"
              />
              <span className="font-semibold text-xs md:text-lg">Admin panel</span>
            </Link>
          )}
        </div>
      </div>

      {/*RIGHT*/}
      <div className="mobile-menu w-[15%] pl-7">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="top-right mt-[-0.6rem] mr-3 md:flex md:justify-end lg:mr-7">
          <div className="hidden md:flex gap-3">
            <div className="group">
              <Link
                to={"/chat"}
              >
              <IoChatboxEllipsesOutline 
                className="small-icons group-hover:hidden cursor-pointer md:size-[1.7rem] lg:size-[2.5rem]"
              />
              <IoChatboxEllipses 
                className="small-icons hidden group-hover:block cursor-pointer md:size-[1.7rem] lg:size-[2.5rem]"
              />
              </Link>
            </div>

            <div className="dropdown">
              <img
                src={user?.profilePicture || "./user.png"}
                className="profile cursor-pointer mt-[-0.2rem] rounded-full w-8 h-8 lg:w-10 lg:h-10"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                alt="User Icon"
              />
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/my-account"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/" onClick={handleLogout}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;