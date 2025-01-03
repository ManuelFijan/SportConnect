import { useNavigate } from "react-router-dom";

function SuccessfulPaymentPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate("/main-page");
  };
  return (
    <div>
      <h1>Successful payment</h1>
      <p>Payment ID: </p>
      <p>{queryParams.toString().split("&").join("\n")}</p>
      <button className="button" onClick={onButtonClick}>
        Go back to main page
      </button>
    </div>
  );
}

export default SuccessfulPaymentPage;
