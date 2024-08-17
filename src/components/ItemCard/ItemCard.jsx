import "./ItemCard.css";
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="cards__card card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button className="button card__like-button"></button>
      </div>
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
