import "./ToggleSwitch.css";
import { useState, useContext, useEffect } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
function ToggleSwitch() {
  //   const { tempUnit, handleToggleSwitchChange } = useContext(
  //     tempUnitContext
  //   );
  //   const [checked, setChecked] = React.useState(tempUnit === "C");
  //   const [tempUnit, setTempUnit] = useState("F");
  //   const handleToggleSwitchChange = (e) => {
  //     if (tempUnit === "F") return setTempUnit("C");
  //     else return setTempUnit("F");
  //   };
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );
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
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-unit switch__temp-unit_C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
