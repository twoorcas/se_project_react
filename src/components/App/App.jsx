import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinate, apiKey } from "../../utils/constant";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import defaultAvatar from "../../assets/avatar.png";
import { getItems, addaItem, deleteItem } from "../../utils/api";
import { signIn, signUp, verifyToken } from "../../utils/auth";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
// import { error } from "console";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("login-modal");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [toDeleteItem, setToDeleteItem] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [userName, setUserName] = useState("Terrence Tegegne");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onLogin = ({ email, password }) => {
    setIsLoading(true);
    return signIn({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        } else throw new Error("no token");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };
  const onRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    return signUp({ email, password, name, avatar })
      .then((res) => {
        closeActiveModal();
        signIn({ email: res.email, password: res.password });
        //TODO anything after send signin req????
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  //to open register form
  const handleRegisterClick = () => {
    setIsMobileMenuOpened(false);
    setActiveModal("register-modal");
  };
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
    setIsLoading(true);
    deleteItem(toDeleteItem)
      .then((res) => {
        closeActiveModal();
        setClothingItems(
          clothingItems.filter((item) => item._id !== toDeleteItem._id)
        );
        setToDeleteItem({});
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const openConfirmationModal = (card) => {
    setIsMobileMenuOpened(false);
    setToDeleteItem(card);
    setActiveModal("delete-confirmation");
  };
  const onAddItem = ({ nameValue, urlValue, type }) => {
    setIsLoading(true);
    addaItem({ nameValue, urlValue, type })
      .then((data) => {
        setClothingItems([...clothingItems, data]);
        closeActiveModal();
        setIsSubmitted(true);
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

    const token = JSON.parse(localStorage.getItem("jwt"));
    verifyToken(token).then();
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
          isSubmitted={isSubmitted}
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
        <RegisterModal
          isOpen={activeModal === "register-modal"}
          onCloseModal={closeActiveModal}
          isLoading={isLoading}
          isSubmitted={isSubmitted}
          onRegister={onRegister}
        />
        <LoginModal
          isOpen={activeModal === "login-modal"}
          onCloseModal={closeActiveModal}
          isLoading={isLoading}
          isSubmitted={isSubmitted}
          onLogin={onLogin}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}
export default App;
