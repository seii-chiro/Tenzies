import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const firstValue = dice[0].value
    const allDiceAreHeld = dice.every(die => die.isHeld)
    const allValueAreSame = dice.every(die => die.value === firstValue)

    if(allDiceAreHeld && allValueAreSame) {
      setTenzies(true)
      console.log("You won");
    }
  }, [dice])

  function allNewDice() {
    const randomNumberArray = []

    for (let i = 0; i < 10; i++) {
      randomNumberArray.push({
        value: Math.floor(Math.random() * 7),
        isHeld: false,
        id: nanoid()
      })
    }

    return randomNumberArray;
  }

  function rollDice() {
    setDice(prev => prev.map(die =>
      die.isHeld ? die :
        {
          value: Math.floor(Math.random() * 7),
          isHeld: false,
          id: nanoid()
        }
    ))
  }

  function restart() {
    setDice(allNewDice)
    setTenzies(false)
  }

  function holdDice(id) {
    setDice(prev => prev.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <>
      <main>
        {
          tenzies ?
            <>
              <Confetti width={500} height={500}/>
              <h2 className='game-over'>You won!</h2>
              <button className='restart-btn-go' onClick={restart}>New Game</button>
            </> :
            <>
              <h1 className='title'>Tenzies</h1>
              <p className='description'>Roll untill all dice are the same. Click the die to hold it.</p>
              <div className="die-container">
                {diceElements}
              </div>
              <button className='reroll-btn' onClick={rollDice}>Reroll</button>
              <button className='restart-btn' onClick={restart}>Restart</button>
            </>
        }
      </main>
    </>
  )
}

export default App
