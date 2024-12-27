import { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import './App.css'
import { Timer } from './components/Timer'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const loginButton = (
    <div className='login'>
      <Button 
        buttonText={"Login"} 
        handleClick={() => setLoggedIn(true)} 
      />
    </div>
  );

  const startButton = (
    <div className='start-session'>
        <Button 
          buttonText={"Start Session"} 
          handleClick={undefined} 
        />
      </div>
  );

  return (
    <main>
      <section className='login-start'>
        {loggedIn ? startButton : loginButton}
      </section>
      <section className='container pomodoro'>
        <Timer />
      </section>
    </main>
  )
}

export default App
