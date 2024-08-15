import "./SideBar.css";
function SideBar({ avatar, username }) {
  return (
    <>
      {" "}
      <div className="side-bar__content_user">
        <img src={avatar} alt={username} className="side-bar__avatar" />
        <p className="side-bar__username">{username}</p>
      </div>
      <div className="side-bar__content_text">
        <p className="side-bar__text_username">{username}</p>
        <p className="side-bar__text">Change profile data</p>
        <p className="side-bar__text">Log out</p>
      </div>
    </>
  );
}
export default SideBar;
