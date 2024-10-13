import "./SideBar.css";
function SideBar({ avatar, userName, initial }) {
  return (
    <>
      {" "}
      <div className="side-bar__content_user">
        <p className="side-bar__placeholder">
          {!avatar ? (
            initial
          ) : (
            <img src={avatar} alt={userName} className="side-bar__avatar" />
          )}
        </p>
        <p className="side-bar__username">{userName}</p>
      </div>
      <div className="side-bar__content_text">
        <p className="side-bar__text_username">{userName}</p>
        <p className="side-bar__text">Change profile data</p>
        <p className="side-bar__text">Log out</p>
      </div>
    </>
  );
}
export default SideBar;
