import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './pages/mainPage'
import YayPage from './pages/yayPage'

function App() {
  const [view, setView] = useState('main');

  return (
    <>
      {view === 'main' && <MainPage changeView={setView} />}
      {view === 'yay' && <YayPage />}
    </>
    )

}

export default App
