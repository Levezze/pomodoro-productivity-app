import React, {useState} from "react";
import { timeInMilisec } from "../utils/timeInMils";

export function SetTime({ timeOption, setTimeOption, setTimeLeft, defaultTime }) {  
  const handleChange = (e) => {
    setTimeOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimeLeft(timeInMilisec(timeOption));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pomodoroSetTime"></label>
      <input id="pomodoroSetTime" type="number" onChange={handleChange} defaultValue={defaultTime} min="0" />
      <button htmlFor="pomodoroSetTime" type="submit">Set Time</button>
    </form>
  )
}