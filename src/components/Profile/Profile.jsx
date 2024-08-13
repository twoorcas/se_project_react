import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import avatar from "../../assets/avatar.png";
function Profile({ avatar, username, handleCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__side-bar">
        <SideBar avatar={avatar} username={username} />
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}
export default Profile;
