import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, initial }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser, isLoggedIn, handleRegisterClick, handleLogInClick } =
    useContext(CurrentUserContext);
  const { avatar, name } = currentUser;
  const loggedInNav = (isLoggedIn) => {
    if (!isLoggedIn) {
      return (
        <>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="header__btn button"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLogInClick}
            className="header__btn button"
          >
            Log In
          </button>
        </>
      );
    } else
      return (
        <>
          <button
            type="button"
            onClick={handleAddClick}
            className="header__btn button"
          >
            + Add clothes
          </button>
          <Link
            to="/profile"
            className="header__link_profile header__link_profile_visible"
          >
            <div className="header__user-container">
              <p className=" header__username">{name}</p>
              <p className="header__placeholder">
                {!avatar ? (
                  initial
                ) : (
                  <img src={avatar} alt={name} className="header__avatar" />
                )}
              </p>
            </div>
          </Link>
        </>
      );
  };
  return (
    <header className="header">
      <div className="header__logo-date-location">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header___date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__icons">
        <ToggleSwitch />
        {loggedInNav(isLoggedIn)}
      </div>
    </header>
  );
}
export default Header;
