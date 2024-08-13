import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";
function ClothesSection({ handleCardClick, clothingItems }) {
  return (
    <>
      <span className="clothes-section__texts">
        <p className="clothes-section__text">Your Items</p>
        <p className="clothes-section__add-button">+ Add New</p>
      </span>
      <ul className="clothes-section__list">
        {clothingItems.toReversed().map((item) => {
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
    </>
  );
}
export default ClothesSection;
