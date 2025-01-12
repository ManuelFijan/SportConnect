import { Dispatch, SetStateAction, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/MobileMenu.css";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 767);
  const { user } = useContext(AuthContext);

  let path = location.pathname;
  path = path.substring(1, path.length);

  /* prilikom rendera stranice postavlja bool varijablu je li sirina prozora veca od 767 px i prema tome ako je
     zatvara mobile menu, ako je na screen-u manje sirine od 767 px mobile menu ostao otvoren
  */
  useEffect(() => {
    const handleResize = () => {
      const screenWide = window.innerWidth > 767;
      setIsScreenWide(screenWide);

      // Ako je širina veća od 767px, zatvori meni
      if (screenWide) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Uklanjamo event listener kada se komponenta unmountuje
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]); // Dodajemo setIsOpen kao zavisnost

  useEffect(() => {
    if (isOpen) {
      // Onemogućavanje scrollanja
      document.body.style.overflow = "hidden";
    } else {
      // Omogućavanje scrollanja
      document.body.style.overflow = "auto";
    }

    // Čišćenje efekta pri unmountu
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="main-menu md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`line w-6 h-1 rounded-sm ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-500`}
        />
        <div
          className={`line w-6 h-1 rounded-sm ${isOpen ? "opacity-0" : ""}`}
        />
        <div
          className={`line w-6 h-1 rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-500`}
        />
      </div>

      {isOpen && !isScreenWide && (
        <div className="menu fixed top-[80px] left-0 w-full flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          <Link
            to="/main-page"
            className="text-white transform transition-transform duration-200 hover:scale-125"
            state={{ user, fromMainPage: true }}
          >
            Home
          </Link>
          <Link
            to={"/about-us?" + path}
            className="text-white transform transition-transform duration-200 hover:scale-125"
            state={{ user }}
          >
            About
          </Link>
          <Link
            to={"/terms-of-service?" + path}
            className="text-white transform transition-transform duration-200 hover:scale-125"
            state={{ user }}
          >
            Services
          </Link>
          <Link to={"/pricing?" + path} className="text-white transform transition-transform duration-200 hover:scale-125" state={{ user }}>
            Pricing
          </Link>
          {/* Admin link */}
          {user?.userType === "ADMIN" && (
            <Link to={"/admin"} className="text-white transform transition-transform duration-200 hover:scale-125" state={{ user }}>
              Admin panel
            </Link>
          )}
          <Link
            to={"/chat"}
            className="text-white transform transition-transform duration-200 hover:scale-125"
            state={{ user, fromMainPage: true }}
          >
            Messages
          </Link>
          <Link to="/my-account" className="text-white transform transition-transform duration-200 hover:scale-125" state={{ user }}>
            Profile
          </Link>
          <Link to="/" 
          className="sign-out-button ml-8">
            <button>Sign Out</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
