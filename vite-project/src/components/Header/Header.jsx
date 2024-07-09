import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="WTWR logo" className="header__logo" />
      <p className="header___date-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
