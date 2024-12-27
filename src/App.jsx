import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './ui/Button'
import './App.css'
import { Timer } from './components/Timer'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const displayLogin = (
    <div className='login'>
      <Button 
        buttonText={"Login"} 
        handleClick={undefined} 
      />
    </div>
    );
  const displayStart = (
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
        {loggedIn ? displayStart : displayLogin}
        {/* <div className='login'>
          <Button 
            buttonText={"Login"} 
            handleClick={undefined} 
          />
        </div>
        <div className='start-session'>
          <Button 
            buttonText={"Start Session"} 
            handleClick={undefined} 
          />
        </div> */}
      </section>
      <section className='container pomodoro'>
        <Timer />
      </section>
    </main>
  )
}

export default App
