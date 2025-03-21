export default function Dice(props){

   return (
       <button style={props.isHeld ? {backgroundColor : "green"} : {backgroundColor: "white"}} onClick={props.hold} className="diceButton">
           {props.value}
       </button>
   )
}