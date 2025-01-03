import { useNavigate } from "react-router-dom";

function FilurePaymentPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate("/main-page");
  };
  return (
    <div>
      <h1>Failed payment</h1>
      <p>Payment ID: </p>
      <button className="button" onClick={onButtonClick}>
        Go back to main page
      </button>
    </div>
  );
}

export default FilurePaymentPage;
