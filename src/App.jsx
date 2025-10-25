import './styles/App.css'
import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";
import {useState} from "react";

function App() {

    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <Header score={score} bestScore={bestScore}></Header>
      <Game score={score} bestScore={bestScore} setScore={setScore} setBestScore={setBestScore}></Game>
    </>
  )
}

export default App
