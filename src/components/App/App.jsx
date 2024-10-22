import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinate, apiKey } from "../../utils/constant";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import defaultAvatar from "../../assets/avatar.png";
import {
  getItems,
  addaItem,
  deleteItem,
  getUserInfo,
  updateProfile,
  likeItem,
  dislikeItem,
} from "../../utils/api";
import { signIn, signUp } from "../../utils/auth";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { setToken, getToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("preview-card");
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
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [token, setCurrentToken] = useState(getToken);
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });
  const [logInError, setLogInError] = useState(false);
  const initial = currentUser.name.split("")[0];
  const navigate = useNavigate();
  const handleCardLike = ({ id, isLiked }) => {
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        likeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        dislikeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };
  const onSaveChanges = ({ name, avatar }) => {
    setIsLoading(true);
    return updateProfile({ name, avatar }, token)
      .then((user) => {
        getUserInfo(token).then((res) => setCurrentUser(res.user));
        setIsSubmitted(true);
        closeActiveModal();
      })

      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
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
        }
      })
      .catch((err) => {
        console.error(err);
        if (err === "Error: 401") {
          setLogInError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    return signUp({ email, password, name, avatar })
      .then((res) => {
        setIsSubmitted(true);
        closeActiveModal();
        // The signup response only includes the user's email
        onLogin({ email: res.email, password: password });
        //TODO anything after send signin req????
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  //to open register form
  const handleLogOutClick = () => {
    setIsSubmitted(false);
    closeActiveModal();
    setToken("");
    setCurrentUser({ name: "", avatar: "" });
    setIsLoggedIn(false);
  };
  const handleEditProfileClick = () => {
    setIsMobileMenuOpened(false);
    setActiveModal("edit-profile-modal");
  };
  const handleRegisterClick = () => {
    setIsSubmitted(false);
    setIsMobileMenuOpened(false);
    setActiveModal("register-modal");
  };
  const handleLogInClick = () => {
    setIsSubmitted(false);
    setIsMobileMenuOpened(false);
    setActiveModal("login-modal");
  };
  const handleAddClick = () => {
    setIsSubmitted(false);
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
          setIsLoggedIn(true);
          setCurrentUser(user);
          setIsLoggedInLoading(false);
        })
        .catch(console.error)
        .finally(() => setIsLoggedInLoading(false));
    } else setIsLoggedInLoading(false);
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
      value={{
        currentUser,
        isLoggedIn,
        isLoggedInLoading,
        handleRegisterClick,
        handleLogInClick,
        handleEditProfileClick,
        handleLogOutClick,
      }}
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
          <EditProfileModal
            handleEditProfileClick={handleEditProfileClick}
            isOpen={activeModal === "edit-profile-modal"}
            onCloseModal={closeActiveModal}
            isLoading={isLoading}
            isSubmitted={isSubmitted}
            onSaveChanges={onSaveChanges}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
