export default function Dice(props){

   return (
       <button style={props.isHeld ? {backgroundColor : "#00CED1"} : {backgroundColor: "white"}} onClick={props.hold} className="diceButton">
           {props.value}
       </button>
   )
}