import "./MobileMenu.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import avatar from "../../assets/avatar.png";
function MobileMenu({
  avatar,
  handleAddClick,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const handleOpenMenu = () => {
    if (isMobileMenuOpened && window.innerWidth <= 770) {
      return "modal_opened";
    }
    return "";
  };
  return (
    <div className={`modal modal__mobile-menu ${handleOpenMenu()} `}>
      <div className="mobile-menu_content">
        <div className="mobile-menu__user-container">
          <p className=" mobile-menu__username">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="mobile-menu__avatar"
          />
          <button
            type="button"
            className="mobile-menu__close"
            onClick={toggleMobileMenu}
          ></button>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className="mobile-menu__add-clothes-btn button"
        >
          + Add clothes
        </button>
        <div className="mobile-menu__switch">
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
}
export default MobileMenu;
