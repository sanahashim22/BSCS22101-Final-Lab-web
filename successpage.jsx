import { Link } from "react-router-dom";
import "./styles.css";

const SuccessPage = () => {
  return (
    <div className="success-container">
      <h2>Congratulations! You have successfully logged in.</h2>
      <Link to="/" className="button">Back to Home</Link>
    </div>
  );
};

export default SuccessPage;
