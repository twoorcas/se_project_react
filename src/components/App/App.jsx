import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import defaultAvatar from "../../assets/avatar.png";
import { getItems, addaItem, deleteItem, getUserInfo } from "../../utils/api";
import { signIn, signUp } from "../../utils/auth";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { setToken, getToken } from "../../utils/token";
import ProtectedRoute from "../ProtectedRoute";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setCurrentToken] = useState(getToken);
  // const [token, setCurrentToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const initial = userName.split("")[0];
  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(false);
  const onLogin = ({ email, password }) => {
    setIsLoading(true);
    return signIn({ email, password })
      .then((res) => {
        if (res.token) {
          setLogInError(false);
          setToken(res.token); //localstorage
          setCurrentToken(res.token); //token state
          getUserInfo(res.token).then((res) => setCurrentUser(res.user));
          setIsLoggedIn(true);
          setIsSubmitted(true);
          closeActiveModal();
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err === "Error: 401") {
          setLogInError(true);
        }
      })
      .finally(() => setIsLoading(false));
  };
  const onRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    return signUp({ email, password, name, avatar })
      .then((res) => {
        setIsSubmitted(true);
        closeActiveModal();
        onLogin({ email: res.email, password: res.password });
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
  const handleLogInClick = () => {
    setIsMobileMenuOpened(false);
    setActiveModal("login-modal");
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
    deleteItem(toDeleteItem, token)
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
    addaItem({ nameValue, urlValue, type }, token)
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

    if (getToken()) {
      getUserInfo(token)
        .then(({ user }) => {
          // setCurrentToken(getToken);
          setIsLoggedIn(true);
          setAvatar(user.avatar);
          setUserName(user.name);
          setCurrentUser(user);
          navigate("/");
        })
        .catch(console.error);
    } else return;
    //else what?????
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 770) {
        setIsMobileMenuOpened(false);
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
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, handleRegisterClick, handleLogInClick }}
    >
      <div className="page">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              initial={initial}
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
                  <ProtectedRoute>
                    <Profile
                      avatar={avatar}
                      userName={userName}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      toggleMobileMenu={toggleMobileMenu}
                      isMobileMenuOpened={isMobileMenuOpened}
                      initial={initial}
                    />
                  </ProtectedRoute>
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
            handleLogInClick={handleLogInClick}
            isOpen={activeModal === "register-modal"}
            onCloseModal={closeActiveModal}
            isLoading={isLoading}
            isSubmitted={isSubmitted}
            onRegister={onRegister}
          />
          <LoginModal
            handleRegisterClick={handleRegisterClick}
            isOpen={activeModal === "login-modal"}
            onCloseModal={closeActiveModal}
            isLoading={isLoading}
            isSubmitted={isSubmitted}
            onLogin={onLogin}
            logInError={logInError}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
