import React from 'react'

const Die = (props) => {

  const style={
    backgroundColor: props.isHeld ? "#beaeeb" : "transparent"
  }

  return (
    <h1 
      className='dice-die' 
      style={style}
      onClick={() => props.handleHold(props.id)}
    >{props.value}</h1>
  )
}

export default Die