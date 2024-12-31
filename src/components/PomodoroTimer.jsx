import React, { useState, useRef, useEffect } from "react";
import { timeInMilisec } from "../utils/timeInMils";
import { Button } from "../ui/Button";
import Alert from "react-bootstrap/Alert";
import useSound from "use-sound";
// import endSession from '../../resources/sounds/end-session.mp3'

export function PomodoroTimer() {
  const defaultTimer = 25;
  const defaultBreak = 5;
  const timeRef = useRef();
  const breakRef = useRef();
  const [timer, setTimer] = useState(timeInMilisec(defaultTimer));
  const [timerBreak, setTimerBreak] = useState(timeInMilisec(defaultBreak));
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakDone, setBreakDone] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [playSound] = useSound('../../resources/sounds/end-session.mp3', {volume: 1,});

  useEffect(()=> {
    let interval;
    if (isRunning && timer) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1000);
      }, 1000);
    } else if (timer <= 0) {
      clearInterval(interval);
      setIsBreak(true);
      playSound();
      // setCycles(prev => prev + 1)
      // console.log(`Learning cycles completed: ${cycles+1}`)
    }
    return () => clearInterval(interval);
  }, [isRunning, timer])

  useEffect(()=> {
    let interval;
    if (isRunning && isBreak && timerBreak) {
      interval = setInterval(() => {
        setTimerBreak((prev) => prev - 1000);
      }, 1000);
    } else if (timerBreak <= 0) {
      clearInterval(interval);
      setIsRunning(false);
      setIsBreak(false);
      setTimerBreak(timeInMilisec(breakRef.current.value));
      setTimer(timeInMilisec(timeRef.current.value));
      setBreakDone(true);
      playSound();
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak, timerBreak])
  
  const clock = (time) => {
    const timeInSeconds = time / 1000;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`
  }

  const handleSubmit = (e, stateSetter, ref) => {
    e.preventDefault()
    stateSetter(timeInMilisec(ref.current.value));
  };

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

  let breakOverAlert;
  if (breakDone) {
    breakOverAlert = (
      <Alert variant="danger" onClose={() => setBreakDone(false)} dismissible>
        <Alert.Heading>Break is over</Alert.Heading>
        <p>
          Press Start to begin another session.
        </p>
      </Alert>
    )
  } else {
    breakOverAlert = <></>
  }
  
  return (
    <>
      <h1>Pomodoro Timer</h1>
      <h2>Set times</h2>
      <div className="PomodoroTimer">
        <div className="Timer set-times">
          <form id="setTimerForm" onSubmit={(e) => handleSubmit(e, setTimer, timeRef)}>
            <label htmlFor="pomodoroSetTimer"></label>
            <input 
              ref={timeRef}
              id="pomodoroSetTimer" 
              name="pomodoroSetTimer" 
              type="number" 
              defaultValue={defaultTimer}
              min="1" 
            />
            <button type="submit">Set Time</button>
          </form>
          <form id="setBreakForm" onSubmit={(e) => handleSubmit(e, setTimerBreak, breakRef)}>
            <label htmlFor="pomodoroSetBreak"></label>
            <input 
              ref={breakRef}
              id="pomodoroSetBreak" 
              type="number" 
              defaultValue={defaultBreak}
              min="1" 
            />
            <button type="submit">Set Break</button>
          </form>
        </div>

        <div className="alert">
          {breakOverAlert}
        </div>

        <div className="Timer countdown">
          <h2>{isBreak ? "Break" : "Study!"}</h2>
          <h3>{isBreak ? clock(timerBreak) : clock(timer)}</h3>
        </div>
        <div className='timer controls'>
          <h3>Controls</h3>
          <div className='buttons'>
            {(isRunning) ? pauseButton : startButton}
            <Button 
              buttonText={"Reset"} 
              handleClick={() => {
                setIsRunning(false); 
                setIsBreak(false); 
                setTimer(timeInMilisec(timeRef.current.value));
                setIsBreak(false);
                }
              } 
            />
          </div>
        </div>
      </div>
    </>
  );
};