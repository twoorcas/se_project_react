import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import avatar from "../../assets/avatar.png";
import MobileMenu from "../MobileMenu/MobileMenu";
function Profile({
  avatar,
  userName,
  handleCardClick,
  clothingItems,
  handleAddClick,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  return (
    <div className="profile">
      <MobileMenu
        avatar={avatar}
        handleAddClick={handleAddClick}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpened={isMobileMenuOpened}
        userName={userName}
      />

      <section className="profile__side-bar">
        <SideBar avatar={avatar} userName={userName} />
        <button className="profile__button" onClick={toggleMobileMenu}></button>
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}
export default Profile;
