import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SuccessfulPaymentPage() {
  const navigate = useNavigate();
  const { search } = useLocation(); // link stavljamo u varijablu search
  const [countdown, setCountdown] = useState(10);
  const [loading] = useState(true);
  const [rank, setRank] = useState("");

  // iz linka poslanog sa backend-a izvlacimo rank da ga mozemo prikazati na stranici
  useEffect(() => {
    const urlParams = new URLSearchParams(search); 
    const rankFromURL = urlParams.get("rank");
    setRank(rankFromURL || "Unknown"); 
  }, [search]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/my-account"); // idemo na my-account nakon uspjesnog placanja
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600">
      <div className="text-center p-40 bg-gray-200 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Successful Payment!!!
        </h1>
        <p className="text-3xl text-gray-700 mb-4">
          You have upgraded to <span className="font-bold">{rank}</span>
        </p>

        {/* Spinner */}
        {loading && (
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-green-500 rounded-full mb-4"></div>
        )}

        {/* Countdown */}
        <div className="text-3xl font-bold text-gray-800">
          Redirecting back in: {countdown} seconds
        </div>
      </div>
    </div>
  );
}

export default SuccessfulPaymentPage;