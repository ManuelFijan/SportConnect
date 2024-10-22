import './App.css';

import Logo from "./components/Logo.tsx";
import Login from "./components/Login.tsx";
import Footer from "./components/Footer.tsx";

function App(){
  return (
      <div className="bg-gray-700 border-2 border-gray-500">
          <div className="flex">
              {/*LIJEVO - SLIKA*/}
              <div className="image w-50">
                  <Logo/>
              </div>
              {/*DESNO - LOGIN*/}
              <div className="login border-2 border-gray-700 w-50 flex flex-col items-center justify-center ">
                  <h1 className="quote">One Day or Day One.</h1>
                  <h3 className="quote">Join now!</h3>
                  <Login/>
              </div>
          </div>

          {/*DOLE - ABOUT*/}
          <div className="about bg-gray-700 border-1 border-gray-700">
              <Footer/>
          </div>

      </div>
  )

}

export default App;