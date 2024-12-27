import React, { useState, useEffect, useMemo } from "react";
import { SetTime } from "../forms/SetTime";
// import { Countdown } from "./Countdown";
import { Button } from "../ui/Button";
import { timeInMilisec } from "../utils/timeInMils";

export function Timer() {
  const defaultTime = 25;
  const [isRunning, setIsRunning] = useState(false)
  const [timeOption, setTimeOption] = useState(timeInMilisec(defaultTime))
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(()=> {
    console.log(`Timer running: ${isRunning}`)
    console.log(timeLeft)
    let interval;
    if (isRunning && timeLeft) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1000);
      }, 1000);
    } else if (timeLeft <= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft])

  

  // console.log(timeInMilisec);

  const clock = (time) => {
    const timeInSeconds = time / 1000;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`
    // console.log(`minutes: ${minutes}, seconds: ${seconds}`)
  }

  return (
    <div className="Timer">
      <h1>Pomodoro Timer</h1>
      <div className="Timer set-time">
        <SetTime 
          timeOption={timeOption}
          setTimeOption={setTimeOption}
          setTimeLeft={setTimeLeft}
          defaultTime={defaultTime}
        />
      </div>
      <div className="Timer countdown">
        <h2>Running/Not running</h2>
        <h3>{clock(timeLeft)}</h3>
        {/* <h3>{timeLeft}</h3> */}
      </div>
      
      <div className='timer controls'>
        <h3>Controls</h3>
        <div className='buttons'>
          <Button 
            buttonText={"Start"} 
            handleClick={() => setIsRunning(true)} 
          />
          <Button 
            buttonText={"Pause"} 
            handleClick={() => setIsRunning(false)} 
          />
          <Button 
            buttonText={"Reset"} 
            handleClick={() => {setIsRunning(false); setTimeLeft(timeInMilisec(defaultTime));}} 
          />
        </div>
      </div>
    </div>
  )

};