import "./ItemCard.css";
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="cards__card card">
      <h2 className="card__name">
        {item.name}
        <button className="button card__like-button"></button>
      </h2>

      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}
export default ItemCard;
