import "./ToggleSwitch.css";
import { useState, useContext, useEffect } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ToggleSwitch() {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={`switch__slider ${
          currentTempUnit === "F" ? "switch__slider-F" : "switch__slider-C"
        }`}
      ></span>
      <p
        className={`switch__temp-unit switch__temp-unit_F ${
          currentTempUnit === "F" && "switch__active"
        } ${isLoggedIn === false && "switch__adjusted"}`}
      >
        F
      </p>
      <p
        className={`switch__temp-unit switch__temp-unit_C ${
          currentTempUnit === "C" && "switch__active"
        } ${isLoggedIn === false && "switch__adjusted"}`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
