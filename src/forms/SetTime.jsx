import React, {useState} from "react";
import { timeInMilisec } from "../utils/timeInMils";

export function SetTime({ timeOption, setTimeOption, setTimeLeft, defaultTime, defaultBreak, setBreakTime }) {  
  const handleChange = (e) => {
    setTimeOption(e.target.value);
  };

  const handleSubmit = (e, stateSetter) => {
    e.preventDefault()
    stateSetter(timeInMilisec(timeOption));
  };

  return (
    <>
      <form id="setTimeForm" onSubmit={(e) => handleSubmit(e, setTimeLeft)}>
        <label htmlFor="pomodoroSetTime"></label>
        <input id="pomodoroSetTime" type="number" onChange={handleChange} defaultValue={defaultTime} min="1" />
        <button htmlFor="pomodoroSetTime" type="submit">Set Time</button>
      </form>
      <form id="setBreakForm" onSubmit={(e) => handleSubmit(e, setBreakTime)}>
        <label htmlFor="pomodoroSetBreak"></label>
        <input id="pomodoroSetBreak" type="number" onChange={handleChange} defaultValue={defaultBreak} min="1" />
        <button htmlFor="pomodoroSetTime" type="submit">Set Break</button>
      </form>
    </>
    
  )
}