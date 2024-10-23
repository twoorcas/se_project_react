import { useState } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(item.likes.includes(currentUser._id));
  const handleClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    setIsLiked((likeState) => !likeState);
  };

  return (
    <li className="cards__card card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={`button card__like-button ${
            !isLiked ? "" : "card__like-button_active"
          }`}
          onClick={handleLike}
          type="button"
        ></button>
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleClick}
      />
    </li>
  );
}
export default ItemCard;
