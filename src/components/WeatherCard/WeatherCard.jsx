import { weatherOptions, defaultWeatherOptions } from "../../utils/constant.js";
import "./WeatherCard.css";
function WeatherCard({ weatherData, tempWithUnit }) {
  const weatherOptionArr = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  let weatherOption;
  if (weatherOptionArr.length > 0) {
    weatherOption = weatherOptionArr?.[0];
  } else {
    weatherOption = weatherData.isDay
      ? defaultWeatherOptions.day
      : defaultWeatherOptions.night;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__text">
        {tempWithUnit.temperature} &deg; {tempWithUnit.currentTempUnit}{" "}
      </p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
