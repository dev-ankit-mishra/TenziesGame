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
                                isHeld :  false,
                                id : nanoid()
                            }))
  }

  function rollDice(){

      setDice(oldDice=>oldDice.map((prev)=>
          prev.isHeld ? prev : {...prev,value : Math.ceil(Math.random()*6)}
      ))
  }

  function hold(id){
      setDice(dice.map((item)=>(
          item.id===id ? {...item,isHeld: !item.isHeld} : item
      )))
  }

  const diceButtons = dice.map(button=>(
      <Dice key={button.id}
            value={button.value}
            isHeld={button.isHeld}
            id={button.id}
            hold={()=>hold(button.id)}    />
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
