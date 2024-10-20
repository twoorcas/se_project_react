import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function SideBar({ avatar, name, initial }) {
  const { handleEditProfileClick, handleLogOutClick } =
    useContext(CurrentUserContext);
  return (
    <>
      {" "}
      <div className="side-bar__content_user">
        {/* <img src={avatar} alt={name} className="side-bar__avatar" /> */}

        <p className="side-bar__placeholder">
          {!avatar ? (
            initial
          ) : (
            <img src={avatar} alt={name} className="side-bar__avatar" />
          )}
        </p>
        <p className="side-bar__username">{name}</p>
      </div>
      <div className="side-bar__content_text">
        <p className="side-bar__text" onClick={handleEditProfileClick}>
          Edit Profile
        </p>
        <p className="side-bar__text" onClick={handleLogOutClick}>
          Log out
        </p>
      </div>
    </>
  );
}
export default SideBar;
