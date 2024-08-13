import "./SideBar.css";
function SideBar({ avatar, username }) {
  return (
    <>
      <img src={avatar} alt={username} className="side-bar__avatar" />
      <p className="side-bar__username">{username}</p>
    </>
  );
}
export default SideBar;
