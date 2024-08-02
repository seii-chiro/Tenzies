const Die = ({value, isHeld, holdDice}) => {
  return (
    <div 
      className="die"
      style={{backgroundColor: isHeld ? "#59E391" : "white"}}
      onClick={holdDice}
    ><h2>{value}</h2></div>
  )
}

export default Die

// #59E391