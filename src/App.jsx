import { useState } from 'react'

import './App.css'
import MainPage from './pages/mainPage'
import YayPage from './pages/yayPage'
import QuestionPage from './pages/quizPage'
import Birthday from './pages/birthday'
import Itinerary from './pages/itinerary'

function App() {
  const [view, setView] = useState('birthday');

  return (
    <>
      {view === 'main' && <MainPage changeView={setView} />}
      {view === 'yay' && <YayPage changeView={setView}/>}
      {view === 'quiz' && <QuestionPage changeView={setView}/>}
      {view === 'birthday' && <Birthday changeView={setView} />}
      {view==='plan' && <Itinerary />}
    </>
    )

}

export default App
