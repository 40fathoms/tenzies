import React from 'react'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'

import Die from './components/Die'

function App() {

  // creating the dice elements state
  const [dice, setDice] = React.useState(allNewDice())

  // creating the endgame status state
  const [tenzies, setTenzies] = React.useState(false)
  
  // creating the current attempts state
  const [attempts, setAttempts] = React.useState(0)

  // creating the best score state
  const [bestScore, setBestScore] = React.useState(
    () => JSON.parse(localStorage.getItem("score")) || undefined
  )
  
  // effect to check if the game is over
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allEqual = dice.every(die => die.value == dice[0].value)
    {(allHeld && allEqual) && setTenzies(true)}  
  }, [dice])

  // function to generate the random dice elements
  function allNewDice() {
    let allDice = []
    for (let i = 0; i < 10; i++) {
      allDice.push(
        { id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false }
      )
    }
    return allDice
  }

  // creating the dice elements based on the dice state
  const diceElements = dice.map(die => (
    <Die
      value={die.value}
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      handleHold={handleHold}
    />)
  )

  // changing the isHeld state
  function handleHold(id) {
    setDice(prevDice => prevDice.map(die => {
      return id == die.id ?
        { ...die, isHeld: !die.isHeld } :
        { ...die }
    }))
  }

  // function to roll the dice again, except the ones held
  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ?
        { ...die } :
        { id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false }
    }))
  }

  // function that uses localStorage to handle the best score and resets the attempts
  function handleBestScore(attempts){
    {((attempts < bestScore) || bestScore == undefined) && localStorage.setItem("score", JSON.stringify(attempts))}
    setBestScore(JSON.parse(localStorage.getItem("score")))
    setAttempts(0)
  }

  return (
    <main className="tenzies">

      {tenzies && <Confetti />}

      <h1 className="title">Tenzi</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="dice">
        {diceElements}
      </div>

      {tenzies == true ?

        <button
          className="roll"
          onClick={() => {setDice(allNewDice()); setTenzies(false); handleBestScore(attempts)}}
        >New Game</button> 
        :
        <button
          className="roll"
          onClick={() => {rollDice(); setAttempts(attempts => attempts+1)}}
        >Roll</button>

      }

      <h2 className="current-attempts">Current attempts: {attempts}</h2>
      <h2 className="best-score">Best score: {bestScore}</h2>

    </main>
  );
}

export default App;