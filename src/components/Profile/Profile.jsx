import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import MobileMenu from "../MobileMenu/MobileMenu";
function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  toggleMobileMenu,
  isMobileMenuOpened,
  initial,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, avatar } = currentUser;
  return (
    <div className="profile">
      <MobileMenu
        avatar={avatar}
        handleAddClick={handleAddClick}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpened={isMobileMenuOpened}
        name={name}
        initial={initial}
      />

      <section className="profile__side-bar">
        <SideBar avatar={avatar} name={name} initial={initial} />
        {/* <button className="profile__button" onClick={toggleMobileMenu}></button> */}
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
