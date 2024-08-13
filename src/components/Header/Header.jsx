import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </Link>
      <p className="header___date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__icons">
        <ToggleSwitch />
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn button"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link_to-profile">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
export default Header;
