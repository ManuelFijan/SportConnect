import { useState } from "react";
import "../styles/Navbar.css";
import MobileMenu from "./MobileMenu";
import { Link, useLocation } from "react-router-dom";

function Navbar({ isOpen, setIsOpen, userPic }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "search...                     🔎"
  );

  const { user } = useLocation().state || {};
  let path = location.pathname;
  path = path.substring(1, path.length);

  // nakon pritiska enter-a cuva vrijednost search polja koje je u navbar-u
  const onEnter = (event: any) => {
    if (event.key == "Enter") {
      setSearchTerm(event.target.value);
      event.preventDefault();
    }
  };

  // ova funkcija sluzi samo da postaimo vrijednost polja za search ili na ono sta upisemo ili na tekst: search....
  const handleChange = (event: any) => {
    if (event.target.value === "")
      setPlaceholder("search...                     🔎");
    else setPlaceholder(event.target.value);
  };

  console.log(searchTerm);

  return (
    <div className="navbar-container">
      <div className="name">
        <h4>
          <strong>SportConnect</strong>
        </h4>
      </div>

      <div className="navbar-links hidden md:flex w-[70%] text-lg mt-20 justify-between">
        {/*LINKS*/}
        <div className="flex ml-[80px] gap-7">
          <Link
            to="/main-page"
            className="flex items-center gap-1"
            state={{ user, fromMainPage: true }}
          >
            <img src="/home1.png" alt="Homepage" className="w-5 h-5" />
            <span className="font-semibold">Homepage</span>
          </Link>

          <Link
            to={"/about-us?" + path}
            className="flex items-center gap-1"
            state={{ user, fromMainPage: true }}
          >
            <img src="/friends1.png" alt="Friends" className="w-5 h-5" />
            <span className="font-semibold">About</span>
          </Link>

          <Link
            to={"/terms-of-service?" + path}
            className="flex items-center gap-1"
            state={{ user, fromMainPage: true }}
          >
            <img src="/stories1.png" alt="Stories" className="w-5 h-5" />
            <span className="font-semibold">Services</span>
          </Link>

          <Link
            to={"/pricing?" + path}
            className="flex items-center gap-1"
            state={{ user, fromMainPage: true }}
          >
            <img src="/stories1.png" alt="Stories" className="w-5 h-5" />
            <span className="font-semibold">Pricing</span>
          </Link>
        </div>

        <div className="search">
          <form className="d-flex" role="search">
            <input
              className="bg-gray-700 rounded-md text-white outline-none"
              type="search"
              onChange={handleChange}
              placeholder={placeholder}
              aria-label="Search"
              onKeyDown={onEnter}
            />
          </form>
        </div>
      </div>

      <div className="search1">
        <form className="d-flex" role="search">
          <input
            className="bg-gray-700 rounded-md text-white"
            type="search"
            onChange={handleChange}
            placeholder={placeholder}
            aria-label="Search"
            onKeyDown={onEnter}
          />
        </form>
      </div>

      {/*RIGHT*/}
      <div className="mobile-menu w-[30%]">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="top-right">
          <div>
            <img src="./message1.png" alt="messageIcon" />
          </div>

          <div className="dropdown">
            <img
              src={userPic.profilePicture || "./user.png"}
              className="profile"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              alt="User Icon"
              style={{ cursor: "pointer" }}
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link
                  className="dropdown-item"
                  to="/my-account"
                  state={{ user }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
