import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinate, apiKey } from "../../utils/constant";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import avatar from "../../assets/avatar.png";
import { getItems, addaItem, deleteItem } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [toDeleteItem, setToDeleteItem] = useState("");
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
  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };
  const handleCardDelete = () => {
    deleteItem(toDeleteItem)
      .then((res) => {
        setActiveModal("");
        setClothingItems(
          clothingItems.filter((item) => item._id !== toDeleteItem._id)
        );
        setToDeleteItem("");
      })
      .catch(console.error);
  };

  const openConfirmationModal = (card) => {
    setToDeleteItem(card);
    setActiveModal("delete-confirmation");
  };
  const onAddItem = ({ nameValue, urlValue, type }) => {
    addaItem({ nameValue, urlValue, type })
      .then((data) => {
        setClothingItems([...clothingItems, data]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinate, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/se_project_react/"
              // path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/se_project_react/profile"
              // path="/profile"
              element={
                <Profile
                  avatar={avatar}
                  username="Terrence Tegegne"
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-clothes-modal"}
          onAddItem={onAddItem}
          onCloseModal={closeActiveModal}
        />
        <ItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          selectedCard={selectedCard}
          openConfirmationModal={openConfirmationModal}
        />
        <DeleteConfirmationModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          handleCardDelete={handleCardDelete}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}
export default App;
