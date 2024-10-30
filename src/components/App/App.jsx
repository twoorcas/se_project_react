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
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [toDeleteItem, setToDeleteItem] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [token, setCurrentToken] = useState(getToken);
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });
  const [logInError, setLogInError] = useState(false);
  const initial = currentUser.name.split("")[0];
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(() => {
        closeActiveModal();
        setIsSubmitted(true);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  const onAddItem = ({ nameValue, urlValue, type }) => {
    const makeRequest = () => {
      return addaItem({ nameValue, urlValue, type }, token).then((data) => {
        setClothingItems([...clothingItems, data]);
      });
    };
    handleSubmit(makeRequest);
  };
  //fix next handle function on friday
  const onProfileChange = ({ name, avatar }) => {
    const makeRequest = () => {
      return updateProfile({ name, avatar }, token).then((res) => {
        setCurrentUser(res.user);
      });
    };
    handleSubmit(makeRequest);
  };
  const onLogin = ({ email, password }) => {
    const makeRequest = () => {
      return signIn({ email, password })
        .then((res) => {
          if (res.token) {
            setLogInError(false);
            setToken(res.token); //localstorage
            setCurrentToken(res.token); //token state
            setCurrentUser(res.user);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err === "Error: 401") {
            setLogInError(true);
          }
        });
    };
    handleSubmit(makeRequest);
  };
  const onRegister = ({ email, password, name, avatar }) => {
    const makeRequest = () => {
      return signUp({ email, password, name, avatar }).then((res) => {
        // The signup response only includes the user's email
        onLogin({ email: res.email, password: password });
      });
    };
    handleSubmit(makeRequest);
  };
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
  function handleCardLike({ item, isLiked }) {
    !isLiked
      ? likeItem(item._id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === updatedCard._id ? updatedCard : card
              )
            );
          })
          .catch((err) => console.log(err))
      : dislikeItem(item._id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === updatedCard._id ? updatedCard : card
              )
            );
          })
          .catch(console.error);
  }
  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };
  const handleCardDelete = () => {
    const makeRequest = () => {
      return (
        deleteItem(toDeleteItem, token)
          //res.send({deleted}) in backend
          .then((res) => {
            closeActiveModal();
            setClothingItems(
              clothingItems.filter((item) => item._id !== toDeleteItem._id)
            );
            setToDeleteItem({});
          })
      );
    };
    handleSubmit(makeRequest);
  };

  const openConfirmationModal = (card) => {
    setIsMobileMenuOpened(false);
    setToDeleteItem(card);
    setActiveModal("delete-confirmation");
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
                    handleCardLike={handleCardLike}
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
                      handleCardLike={handleCardLike}
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
            isOpen={activeModal === "preview-card"}
            onClose={closeActiveModal}
            selectedCard={selectedCard}
            openConfirmationModal={openConfirmationModal}
            isLoading={isLoading}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
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
            onProfileChange={onProfileChange}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
