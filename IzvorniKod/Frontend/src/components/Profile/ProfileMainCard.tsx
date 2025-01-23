import "../../styles/ProfileMainCard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext, User } from "../../context/AuthContext";
import defaultProfilePicture from "/user.png";
import { FaMedal } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

function ProfileMainCard({ balance }: any) {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState<User | null>(user);
  const [isEditing, setIsEditing] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [bool3, setBool3] = useState(true);

  const [lastNameError, setLastNameError] = useState("");
  const [bool4, setBool4] = useState(true);

  const [errorMessage1, setUsernameError] = useState("");
  const [bool1, setBool1] = useState(true);

  const [errorMessage2, setNumError] = useState("");
  const [bool2, setBool2] = useState(true);

  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (isEditing) {
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
  }, [isEditing]);

  // ako se promjene podatci unutar forme ova funkcija prode po svim unosima i samo update-a podatke u varijabli formData
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const toggleEditForm = () => {
    // svaki put kada ponovo otvorimo ili zatvorimo formu, u nju stavimo najnovijeg user-a i postavimo bools na true jer nema errora
    // u smislu ovo je kao refresh forme
    setIsEditing(!isEditing);
    setFormData(user);
    setBool1(true);
    setBool2(true);
    setBool3(true);
    setBool4(true);
  };

  // kada stisnemo gumb submit na formi onda ulazimo u ovu funkciju koja sluzi u ovom slucaju da update-amo podatke user-a
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    let var1 = false,
      var2 = false,
      var3 = false,
      var4 = false;

    // provjeravamo format imena
    let tmp1 = formData.firstName.split("");
    if (/^[A-ZČĆŠĐŽ]+$/.test(tmp1[0]) && tmp1.length > 1) {
      let br = 0;
      tmp1.map((t: string) => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? "" : br++));
      //ako je br 0 to znaci da ga nismo povecavali tj. svaki t se nalazio u zadanom regex-u
      if (br === 0) {
        setBool3(true);
        var3 = true;
      } else {
        setBool3(false);
        setFirstNameError("Incorrect name format");
      }
    } else {
      setBool3(false);
      setFirstNameError("Incorrect name format");
    }

    // provjeravamo format prezimena
    let tmp2 = formData.lastName.split("");
    if (/^[A-ZČĆŠĐŽ]+$/.test(tmp2[0]) && tmp2.length > 1) {
      let br = 0;
      tmp2.map((t: string) => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? "" : br++));
      if (br === 0) {
        setBool4(true);
        var4 = true;
      } else {
        setBool4(false);
        setLastNameError("Incorrect surname format");
      }
    } else {
      setBool4(false);
      setLastNameError("Incorrect surname format");
    }

    // provjera formata username-a
    let tmp3 = formData.userName.split("");
    if (/^[a-zA-Z]$/.test(tmp3[0]) && tmp3.length > 3) {
      let br = 0;
      tmp3.map((t: string) => (/^[a-zA-Z0-9._]$/.test(t) ? "" : br++));
      if (br === 0) {
        setBool1(true);
        var1 = true;
      } else {
        setBool1(false);
        setUsernameError("Incorrect username format");
      }
    } else {
      setBool1(false);
      setUsernameError("Incorrect username format");
    }

    // provjera formata broja mobitela
    let tmp4 = formData.mobileNumber.split(" ");
    let tmp5 = tmp4[0].split("");
    if (
      tmp5[0] === "+" &&
      isFinite(Number(tmp4[1])) &&
      tmp4[1].length > 6 &&
      !tmp4[1].includes(".")
    ) {
      tmp5[0] = "0";
      let br = 0;
      tmp5.map((t: any) => (isFinite(Number(t)) ? "" : br++));
      if (br === 0 && tmp5[1] && tmp4[1]) {
        setBool2(true);
        var2 = true;
      } else {
        setBool2(false);
        setNumError("+(country_code)  phone_number");
      }
    } else {
      setBool2(false);
      setNumError("+(country_code)  phone_number");
    }

    /* ako je su svi podatci dobrog formata radimo fetch na backend preko mail-a user-a (to je kao id)
           prema primljenom mail-u backend update-a podatke i vrati ih
        */
    if (var1 && var2 && var3 && var4) {
      try {
        if (!user) return;
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/users/update?email=${encodeURIComponent(user.email)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              userName: formData.userName,
              mobileNumber: formData.mobileNumber,
            }),
          }
        );

        const data = await response.json();

        // Ako je update uspjesan, update AuthContext i zatvori formu
        if (response.ok) {
          setUser(data);
          setIsEditing(false);
        } else {
          // postavljanje svih potrebnih error-a

          if (data.userNameError) {
            setUsernameError(data.userNameError);
            setBool1(false);
          }

          if (data.phoneNumberError) {
            setNumError(data.phoneNumberError);
            setBool2(false);
          }
        }
      } catch (error) {
        console.error("Error while updating user:", error);
      }
    }
  };

  const imgUpload = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
    if (!file || !user) return;

    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("file", file);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/update-profile-picture`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile picture");
      }

      const updatedUser = await response.json();

      setUser(updatedUser);
      setImage(updatedUser.profilePicture);
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };

  // Ako se user ili formData nisu jos load-ali, prikazi loading
  if (!user || !formData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  // Ako se user ili formData nisu jos load-ali, prikazi loading
  if (!user || !formData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className={"profile-container-main"}>
      <div className="relative w-full">
        <img
          src="./profile-background.jpg"
          alt="background"
          className="img1-main w-full rounded-lg"
        />

        <div
          className="absolute left-1/2 bottom-[-3%] transform -translate-x-1/2 translate-y-1/2 w-[15vw] h-[15vw] rounded-full overflow-hidden flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {user.userType === "ADMIN" ? (
            <RiAdminLine className="rounded-full text-gray-700 p-3 h-full w-full bg-white" />
          ) : (
            <img
              src={image || user.profilePicture || defaultProfilePicture}
              alt={`${user.userName}'s profile`}
              className="w-full h-full object-cover"
            />
          )}

          {user.userType !== "ADMIN" && isHovered && (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl sm:text-5xl md:text-7xl">
                +
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={imgUpload}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 h-20 mt-[calc(7vw+0.7rem)]">
        <span className="text-[20px] md:text-2xl lg:text-3xl text-white font-bold mb-2">
          {user.firstName} {user.userType !== "ADMIN" && user.lastName}
        </span>

        {/*ovisno koji je plan takve je boje medalja*/}
        {user.userType !== "ADMIN" && user.subscriptionPlan === "GOLD" && (
          <>
            <div className="text-[#f0bf0d] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#f0bf0d] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}

        {user.userType !== "ADMIN" && user.subscriptionPlan === "SILVER" && (
          <>
            <div className="text-[#cecdcd] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#cecdcd] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}

        {user.userType !== "ADMIN" && user.subscriptionPlan === "BRONZE" && (
          <>
            <div className="text-[#b3652c] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#b3652c] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}

        {user.userType !== "ADMIN" && user.subscriptionPlan === "FREE" && (
          <>
            <div className="text-[#279536] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#279536] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}
        {user.userType === "ADMIN" && (
          <>
            <div className="text-gray-400 hidden lg:block">
              <AiOutlineSetting size={40} />
            </div>

            <div className="text-gray-400 block lg:hidden">
              <AiOutlineSetting size={30} />
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleEditForm}
          className="bg-[#5643cc] hover:bg-[#34297b] font-bold rounded-lg text-white text-[1rem] mt-2 md:mt-2 h-10 px-3 md:w-[8.5rem]"
        >
          Edit Profile
        </button>
        {user.subscriptionPlan !== "GOLD" && user.userType !== "ADMIN" && (
          <Link
            to="/pricing"
            state={{
              message1: "You are just one step away...",
              message2:
                "Choose the plan that best suits your needs and unlock the features you desire!",
            }}
            className="mt-2 text-sm lg:text-base bg-[#a7fbcb] text-gray-500 font-bold px-2 h-10 rounded-lg hover:bg-[#51bf81] transition duration-200 no-underline md:hidden text-center flex items-center justify-center"
          >
            Upgrade Now
          </Link>
        )}
      </div>

      <p className="mt-4 text-[#a7fbcb] text-[18px] font-bold block md:hidden">
        My Balance: {balance?.toFixed(2)}$
      </p>

      {isEditing && (
        <div className="modal-overlay bg-gray-700 bg-opacity-80">
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="edit-form">
              <h2>Edit Profile</h2>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {bool3 ? (
                  ""
                ) : (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    {firstNameError}
                  </div>
                )}
              </div>
              <div>
                <label>Surname:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {bool4 ? (
                  ""
                ) : (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    {lastNameError}
                  </div>
                )}
              </div>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
                {bool1 ? (
                  ""
                ) : (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    {errorMessage1}
                  </div>
                )}
              </div>
              <div>
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
                {bool2 ? (
                  ""
                ) : (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    {errorMessage2}
                  </div>
                )}
              </div>
              <div className="modal-buttons">
                <button type="submit" className="button-save">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={toggleEditForm}
                  className="button-close"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMainCard;
