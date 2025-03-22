import {useEffect, useRef, useState} from 'react'
import Dice from './Dice'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'


function App() {

    const [dice, setDice] = useState(() => generateDice())

    const gameWon = dice.every((die) => die.isHeld) && dice.every((die) => die.value === dice[0].value)

    const buttonRef=useRef(null)

    const [count, setCount] = useState(0)


    useEffect(() => {
        if(gameWon){
            buttonRef.current.focus();
        }
    },[gameWon])

    function generateDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()
            }))
    }

    function rollDice() {
        if (!gameWon) {
            setCount(prevCount => prevCount + 1)
            setDice(oldDice => oldDice.map((prev) => prev.isHeld ? prev : {
                ...prev,
                value: Math.ceil(Math.random() * 6)
            }))
        } else {
            setCount(0)
            setDice(generateDice())
        }

    }

    function hold(id) {
        setDice(dice.map((item) => (item.id === id ? {...item, isHeld: !item.isHeld} : item)))
    }

    const diceButtons = dice.map(button => (<Dice key={button.id}
                                                  value={button.value}
                                                  isHeld={button.isHeld}
                                                  id={button.id}
                                                  hold={() => hold(button.id)}/>))
    return (<main className="app">
            {gameWon && <Confetti />}
            <h1 className="heading">Tenzies</h1>
            <p className="para">Roll until dice are the same.Click each dice to freeze it at its current value between
                rolls.</p>
            <div className="container">
                {diceButtons}
            </div>
            <button ref={buttonRef} onClick={rollDice} className="rollButton">{gameWon ? "New Game" : "Roll"}</button>
        {gameWon && <p className="count-para">You took {count} attempts. </p>}
        </main>)
}

export default App
