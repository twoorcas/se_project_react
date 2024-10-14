import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import ItemCard from "../ItemCard/ItemCard";
function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  const { _id } = useContext(CurrentUserContext);
  const userAddedClothingItems = clothingItems.filter(
    (item) => item.owner === _id
  );
  return (
    <div className="clothes-section">
      <span className="clothes-section__texts">
        <p className="clothes-section__text">Your Items</p>
        <p className="clothes-section__add-button" onClick={handleAddClick}>
          + Add New
        </p>
      </span>
      <ul className="clothes-section__list">
        {userAddedClothingItems.toReversed().map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              weather={item.weather}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
