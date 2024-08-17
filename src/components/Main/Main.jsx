import WeatherCard from "../WeatherCard/WeatherCard";

import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const temperature = weatherData?.temp?.[currentTempUnit] || 999;
  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        tempWithUnit={{ temperature, currentTempUnit }}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature} &deg; {currentTempUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .toReversed()
            .filter((item) => {
              return item.weather === weatherData?.type;
            })
            .map((item) => {
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
      </section>
    </main>
  );
}
export default Main;
