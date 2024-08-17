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
import defaultAvatar from "../../assets/avatar.png";
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
  const [toDeleteItem, setToDeleteItem] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [userName, setUserName] = useState("Terrence Tegegne");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = () => {
    setIsMobileMenuOpened(false);
    setActiveModal("add-item-modal");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setIsMobileMenuOpened(false);
    setSelectedCard(card);
    setActiveModal("preview-card");
  };
  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };
  const handleCardDelete = () => {
    deleteItem(toDeleteItem)
      .then((res) => {
        setIsLoading(true);
        closeActiveModal();
        setClothingItems(
          clothingItems.filter((item) => item._id !== toDeleteItem._id)
        );
        setToDeleteItem({});
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  };

  const openConfirmationModal = (card) => {
    setIsMobileMenuOpened(false);
    setToDeleteItem(card);
    setActiveModal("delete-confirmation");
  };
  const onAddItem = ({ nameValue, urlValue, type }) => {
    addaItem({ nameValue, urlValue, type })
      .then((data) => {
        setIsLoading(true);
        setClothingItems([...clothingItems, data]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };
  const toggleMobileMenu = () => {
    if (isMobileMenuOpened) {
      return setIsMobileMenuOpened(false);
    }
    return setIsMobileMenuOpened(true);
  };
  // const handleResize = () => {
  //   if (window.innerWidth > 770) {
  //     setIsMobileMenuOpened(false);
  //     console.log(">770px");
  //   }
  //   if (window.innerWidth < 345) {
  //     setIsMobileMenuOpened(false);
  //   }
  // };
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 770) {
        setIsMobileMenuOpened(false);
        console.log(">770px");
      }
      if (window.innerWidth < 345) {
        setIsMobileMenuOpened(false);
      }
    };
    // call once to start off
    handleResize();
    // add listener
    window.addEventListener("resize", handleResize);

    // clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect =not lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      //  clean up function for removing the listener when unmount
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);
  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            avatar={avatar}
            userName={userName}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  avatar={avatar}
                  userName={userName}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  toggleMobileMenu={toggleMobileMenu}
                  isMobileMenuOpened={isMobileMenuOpened}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-item-modal"}
          onAddItem={onAddItem}
          onCloseModal={closeActiveModal}
          isLoading={isLoading}
        />
        <ItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          selectedCard={selectedCard}
          openConfirmationModal={openConfirmationModal}
          isLoading={isLoading}
        />
        <DeleteConfirmationModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          handleCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}
export default App;
