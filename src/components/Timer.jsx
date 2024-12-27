import React, { useState, useEffect, useMemo } from "react";
import { SetTime } from "../forms/SetTime";
// import { Countdown } from "./Countdown";
import { Button } from "../ui/Button";
import { timeInMilisec } from "../utils/timeInMils";

export function Timer() {
  const defaultTime = 25;
  const defaultBreak = 5;
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false);
  const [timeOption, setTimeOption] = useState(timeInMilisec(defaultTime))
  const [timeLeft, setTimeLeft] = useState(timeInMilisec(defaultTime));
  const [breakTime, setBreakTime] = useState(timeInMilisec(defaultBreak));

  useEffect(()=> {
    let interval;
    if (isRunning && timeLeft) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1000);
      }, 1000);
    } else if (timeLeft <= 0) {
      clearInterval(interval);
      setIsRunning(false);
      setIsBreak(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft])

  useEffect(()=> {
    let interval;
    if (isBreak && breakTime) {
      interval = setInterval(() => {
        setBreakTime((prev) => prev - 1000);
      }, 1000);
    } else if (breakTime <= 0) {
      clearInterval(interval);
      setIsBreak(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft])

  const clock = (time) => {
    const timeInSeconds = time / 1000;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`
  }

  const startButton = (
    <Button 
      buttonText={"Start"} 
      handleClick={() => setIsRunning(true)} 
    />
  );

  const pauseButton = (
    <Button 
      buttonText={"Pause"} 
      handleClick={() => setIsRunning(false)} 
    />
  );

  return (
    <div className="Timer">
      <h1>Pomodoro Timer</h1>
      <div className="Timer set-time">
        <SetTime 
          timeOption={timeOption}
          setTimeOption={setTimeOption}
          setTimeLeft={setTimeLeft}
          defaultTime={defaultTime}
          defaultBreak={defaultBreak}
          setBreakTime={setBreakTime}
        />
      </div>
      <div className="Timer countdown">
        <h2>{isRunning ? "Time to focus!" : "No rest for the wicked!"}</h2>
        <h3>{isBreak ? clock(breakTime) : clock(timeLeft)}</h3>
      </div>
      <div className='timer controls'>
        <h3>Controls</h3>
        <div className='buttons'>
          {isRunning ? pauseButton : startButton}
          <Button 
            buttonText={"Reset"} 
            handleClick={() => {setIsRunning(false); setTimeLeft(timeInMilisec(timeOption));}} 
          />
        </div>
      </div>
    </div>
  )

};