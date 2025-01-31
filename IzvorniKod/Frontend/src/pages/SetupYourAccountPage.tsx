import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CreateAccountPage.css";
import Footer from "../components/Layout/Footer";
import { AuthContext, User } from "../context/AuthContext"; // Import AuthContext

// oblik varijable koji nam je potreban prilikom fetch-a na backend kako bi mogli dobiti podatke
interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  provider: string;
}

function SetupYourAccountPage() {
  const { setToken, setUserEmail, setUser } = useContext(AuthContext); // Access AuthContext
  const [userData, setUserData] = useState<UserData | null>(null);

  const navigate = useNavigate();

  /*svaki put kada se refresh-a stranica fetch-amo backend kako bi dobili najaktualnije podatke
      dobivene preko google ili facebook sign in
    */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/users/signedin`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User Info:", data);
        setUserData(data);
        setUser(data as User);

        // Token se postavlja na "google"
        localStorage.setItem("token", "google");
        setToken("google");

        // Postavljanje userEmail u localStorage i AuthContext
        if (data.email) {
          localStorage.setItem("userEmail", data.email);
          setUserEmail(data.email);
        } else {
          console.warn("Email not found in user data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [setToken, setUserEmail, setUser]);

  //kontrola formata lozinke
  const [password, setPassword] = useState("");
  const [errorMessage2, setPasswordError] = useState("");
  const [bool2, setBool2] = useState(true);

  //kontrola formata email-a
  const [errorMessage3, setEmailError] = useState("");
  const [bool3, setBool3] = useState(true);

  //kontrola formata korisnickog imena
  const [username, setUsername] = useState("");
  const [errorMessage4, setUsernameError] = useState("");
  const [bool4, setBool4] = useState(true);

  //kontrola formata broja
  const [num, setNum] = useState("");
  const [errorMessage5, setNumError] = useState("");
  const [bool5, setBool5] = useState(true);

  //ove 3 funkcije sluze samo da promjenimo vrijednosti varijable kada se unese nesto u polje forme
  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
  };

  const usernameOnChange = (e: any) => {
    setUsername(e.target.value);
  };

  const numOnChange = (e: any) => {
    setNum(e.target.value);
  };

  /* ova funkcija sluzi da za gumbe gdje biramo jesmo li klijent ili partner, ili pak free/bronze/silver/gold
       vrati njihovu vrijednost (odnosno tekstualno ono što smo odabrali)
    */
  function findChecked(): string {
    let radios = document.querySelectorAll<HTMLInputElement>(
      '#toggleForm1 input[name="role"]'
    );

    let selectedValue = "";

    radios.forEach((radio) => {
      if (radio.checked) {
        selectedValue = radio.value;
      }
    });

    return selectedValue;
  }

  /*kada stisnemo submit na gumbu forme, ulazimo u ovu funkciju cija je funkcionalnost provjeriti podatke unesene
      u formu i ako je sve ok radi se fetch na backend
    */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const btn_role = findChecked().toUpperCase();

    let var2 = false,
      var4 = false,
      var5 = false;

    //provjera da je password dulji od 6 znakova
    if (password.length < 6) {
      setPasswordError("Password must be longer then 6 characters");
      setBool2(false);
    } else {
      setBool2(true);
      var2 = true;
    }

    // provjera username-a
    if (userData == null) {
    }

    let tmp3 = (username || userData?.userName || "").split("");

    if (/^[a-zA-Z]$/.test(tmp3[0]) && tmp3.length > 3) {
      let br = 0;
      tmp3.map((t) => (/^[a-zA-Z0-9._]$/.test(t) ? "" : br++));
      if (br === 0) {
        setBool4(true);
        var4 = true;
      } else {
        setBool4(false);
        setUsernameError("Incorrect username format");
      }
    } else {
      setBool4(false);
      setUsernameError("Incorrect username format");
    }

    // provjera broja mobitela
    let tmp4 = num.split(" ");
    let tmp5 = tmp4[0].split("");
    if (
      tmp5[0] === "+" &&
      isFinite(Number(tmp4[1])) &&
      tmp4[1].length > 6 &&
      !tmp4[1].includes(".")
    ) {
      tmp5[0] = "0";
      let br = 0;
      tmp5.map((t) => (isFinite(Number(t)) ? "" : br++));
      if (br === 0 && tmp5[1] && tmp4[1]) {
        setBool5(true);
        var5 = true;
      } else {
        setBool5(false);
        setNumError("+(country_code)  phone_number");
      }
    } else {
      setBool5(false);
      setNumError("+(country_code)  phone_number");
    }

    //ako su svi podatci uneseni u formu dobrog oblika radi se fetch na backend kako bi registrirali korisnika
    if (var2 && var4 && var5) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/users/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: userData?.email,
              password: password,
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              userName: username || userData?.userName || "",
              userType: btn_role,
              subscriptionPlan: "FREE",
              mobileNumber: num,
              profilePicture: userData?.profilePicture,
            }),
          }
        );

        const data = await response.json();

        // ako je registracija uspjesna, postavi token, userEmail, user u AuthContext i idi na /main-page
        if (response.ok) {
          console.log("Register successful:", data);
          const loginResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_API}/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                identifier: data.email,
                password: password,
              }),
            }
          );

          const loginData = await loginResponse.json();

          if (loginResponse.ok) {
            console.log("Login successful:", loginData);

            // isto kao u create-acc
            if (
              loginData.accessToken &&
              loginData.user &&
              loginData.user.email
            ) {
              localStorage.setItem("token", loginData.accessToken);
              localStorage.setItem("userEmail", loginData.user.email);

              // Update AuthContext
              setToken(loginData.accessToken);
              setUserEmail(loginData.user.email);
              setUser(loginData.user as User);

              // Idi na /main-page
              navigate("/main-page", {
                state: {
                  user: loginData.user,
                  fromCreateAccount: true,
                },
              });
            } else {
              console.warn(
                "Access token or user email missing in login response."
              );
              alert(
                "Setup succeeded but failed to log in. Please log in manually."
              );
            }
          } else {
            console.log("Login failed:", loginData);
            alert(`Login Error: ${loginData.message || "Failed to log in."}`);
          }
        } else {
          console.log(data);

          // postavljanje svih potrebnih error-a
          if (data.emailError) {
            setEmailError(data.emailError);
            setBool3(false);
          }
          if (data.userNameError) {
            setUsernameError(data.userNameError);
            setBool4(false);
          }
          if (data.phoneNumberError) {
            setNumError(data.phoneNumberError);
            setBool5(false);
          }
        }
      } catch (error) {
        console.error("Error while registering and logging in:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // funckija za odselektiranje gumba ako drugi selektiramo
  function toggleActive() {
    let labels = document.querySelectorAll(
      "#toggleForm1 .btn"
    ) as NodeListOf<HTMLLabelElement>;

    labels.forEach((label) => {
      label.onclick = () => {
        // Uklanja 'active' klasu sa svih labela
        labels.forEach((l) => l.classList.remove("active"));

        // Dodaje 'active' klasu na kliknuti label
        label.classList.add("active");
      };
    });
  }

  return (
    <div className="create-acc-container bg-gray-700 min-h-screen min-w-screen">
      <div className="logopic ml-[10rem] xs:ml-[30px]">
        <img src="/logo.png" />
      </div>
      <div className="create-card">
        <h2 className="ml-2">Finish creating your account!</h2>

        <p className="ml-2">Fill in the rest of the fields</p>
        <p className="ml-2">and join our community!</p>

        <form onSubmit={handleSubmit}>
          <div className=" form-container mt-3">
            <div className="left-container">
              <div
                className="btn-group"
                role="group"
                aria-label="Toggle button group"
                id="toggleForm1"
              >
                <label
                  className="btn btn-outline-dark"
                  onClick={() => toggleActive()}
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="role"
                    value="Client"
                    required
                  />{" "}
                  Client
                </label>

                <label
                  className="btn btn-outline-dark"
                  onClick={() => toggleActive()}
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="role"
                    value="Partner"
                    required
                  />{" "}
                  Partner
                </label>
              </div>

              <input
                type="text"
                value={userData ? userData.firstName : ""}
                className="form-control mt-3"
                readOnly
              />
              <input
                type="text"
                value={userData ? userData.lastName : ""}
                className="form-control mt-3"
                readOnly
              />
              <input
                type="text"
                value={userData ? userData.userName : ""}
                onChange={usernameOnChange}
                placeholder="Username"
                className="form-control mt-3"
                maxLength={20}
                required
              />
              {bool4 ? "" : <div style={{ color: "red" }}>{errorMessage4}</div>}
            </div>

            <div className="right-container mr-2 ">
              <input
                type="text"
                onChange={numOnChange}
                placeholder="Contact (mobile/telephone number)"
                className="form-control mt-3"
                maxLength={19}
                required
              />
              {bool5 ? "" : <div style={{ color: "red" }}>{errorMessage5}</div>}
              <input
                type="text"
                value={userData ? userData.email : ""}
                className="form-control mt-3"
                readOnly
              />
              {bool3 ? "" : <div style={{ color: "red" }}>{errorMessage3}</div>}
              <input
                type="password"
                onChange={passwordOnChange}
                placeholder="Password"
                className="form-control mt-3"
                maxLength={20}
                required
              />
              {bool2 ? "" : <div style={{ color: "red" }}>{errorMessage2}</div>}
            </div>
          </div>

          <input type="checkbox" className="ml-2 mt-3" required />
          <p className="text-xs ml-7 mt-[-20px]">
            I have read and agree to SportConnect's{" "}
            <a href="/terms-of-service">Terms of Service </a>
            and <a href="/privacy-policy">Privacy Policy</a>
          </p>

          <div className="buttons ml-2">
            <button type="submit" className="btn1 mr-3">
              Continue
            </button>
            <Link to={"/"}>
              <button className="close-btn mr-2">Close</button>
            </Link>
          </div>
        </form>
        <br />
        <div className="link">
          <span className="message">Already have an account? </span>
          <Link to={"/sign-in"}>
            <button className="signUp"> Sign in</button>
          </Link>
        </div>
      </div>
      <div className="picture">
        <img src="./SignIn.png" alt="motivatePicture" />
      </div>

      <div className="about-create-page bg-gray-700">
        <Footer />
      </div>
    </div>
  );
}

export default SetupYourAccountPage;
