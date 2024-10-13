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
  initial,
}) {
  return (
    <div className="profile">
      <MobileMenu
        avatar={avatar}
        handleAddClick={handleAddClick}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpened={isMobileMenuOpened}
        userName={userName}
        initial={initial}
      />

      <section className="profile__side-bar">
        <SideBar avatar={avatar} userName={userName} initial={initial} />
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
