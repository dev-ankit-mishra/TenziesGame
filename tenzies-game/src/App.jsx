import {useState} from 'react'
import Dice from './Dice'
import  {nanoid} from 'nanoid'
function App() {

  const [dice, setDice] = useState(()=>generateDice())

  function generateDice() {
      return new Array(10)
                            .fill(0)
                            .map(()=>({
                                value : Math.ceil(Math.random()*6),
                                isHeld :  true,
                                id : nanoid()
                            }))
  }

  function rollDice(){
      setDice(generateDice())
  }

  const diceButtons = dice.map(button=>(
      <Dice key={button.id} value={button.value} isHeld={button.isHeld} id={button.id}  />
  ))
  return(
      <main className="app">
          <div className="container">
              {diceButtons}
          </div>
          <button onClick={rollDice} className="rollButton">Roll</button>
      </main>
  )
}

export default App
