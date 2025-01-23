import "../styles/Homepage.css";
import Logo from "../components/Layout/Logo.tsx";
import Login from "../components/Layout/Login.tsx";
import Footer from "../components/Layout/Footer.tsx";
import SignInPage from "./SignInPage.tsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Homepage() {
  // saznaj je li url /sign-in
  const location = useLocation();
  const bool = location.pathname === "/sign-in";
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Pristupi tokenu iz AuthContext
  const [mobile, setMobile] = useState(window.innerWidth < 450 ? true : false);

  // ovo sluzi ako smo samo otvorili browser da se ode na main-page bez ikakvog sign-in/up
  useEffect(() => {
    if (token) {
      // Ako token postoji, idi na /main-page
      navigate("/main-page");
    }
  }, [token, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) setMobile(true);
      else setMobile(false);
    };

    console.log(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Uklanjamo event listener kada se komponenta unmountuje
    return () => window.removeEventListener("resize", handleResize);
  });

  /*kada je url /sign-in onda dodamo prefix u imenu klase glavnog diva
    te u .css dat. pogodimo taj div i bluramo ga cijelog, a posto je bool = true onda
    se izrenderira nova komponenta koju fiksiramo na sredinu stranice*/
  return (
    <>
      <div
        className={
          (bool ? "blur-" : "") +
          "container1 bg-gray-700 border-2 border-gray-500 min-h-screen min-w-screen flex flex-col justify-between"
        }
      >
        {!mobile ? (
          <div className="flex">
            {/*LIJEVO - SLIKA*/}
            <div className="image w-50">
              <Logo />
            </div>
            {/*DESNO - LOGIN*/}
            <div className="login border-2 border-gray-700 w-50 flex flex-col items-center justify-center">
              <h1 className="quote">One Day or Day One.</h1>
              <h3 className="quote">Join now!</h3>
              <Login />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-start gap-16 pt-10">
            {/* GORE - SLIKA i QUOTE */}
            <div className="w-full h-[10rem] flex flex-row justify-center items-center gap-1">
              <div className="w-[50%] -mt-28 ml-10">
                <Logo />
              </div>
              <div className="text-white flex flex-col gap-2 mt-6 mr-3">
                <div className="flex flex-col">
                  <h1 className="">One Day or</h1>
                  <h1 className="-mt-2">Day One.</h1>
                </div>
                <h4 className="">Join now!</h4>
              </div>
            </div>
            {/*DOLJE - LOGIN*/}
            <div className="border-2 border-gray-700 w-full flex flex-col items-center justify-center">
              <Login />
            </div>
          </div>
        )}

        {/*DOLE - ABOUT*/}
        <div className="about bg-gray-700 border-1 border-gray-700">
          <Footer />
        </div>
      </div>

      {bool ? <SignInPage /> : null}
    </>
  );
}

export default Homepage;
