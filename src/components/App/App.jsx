import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinate, apiKey } from "../../utils/constant";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleAddClick = () => {
    setActiveModal("add-clothes-modal");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview-card");
  };
  useEffect(() => {
    getWeather(coordinate, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        titleText="New garment"
        onClose={closeActiveModal}
        isOpen={activeModal === "add-clothes-modal"}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            required
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            placeholder="image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className=" modal__radio-label">
            <input
              type="radio"
              className=" modal__input_type_radio"
              id="hot"
              name="weather-type"
            />
            Hot{" "}
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input
              type="radio"
              className=" modal__input_type_radio"
              id="warm"
              name="weather-type"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input
              type="radio"
              className=" modal__input_type_radio"
              id="cold"
              name="weather-type"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        selectedCard={selectedCard}
      />
    </div>
  );
}
export default App;
