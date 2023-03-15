import React, { useState } from 'react'
import './style.css'

// don't change the Component name "App"
export default function App() {
  const [enableStyle, setEnableStyle] = useState('false')

  const handleClick = () => {
    setEnableStyle(!enableStyle)
  }

  return (
    <div>
      <p className={`${!enableStyle ? 'active' : ''}`}>Style me!</p>
      <button onClick={handleClick}>Toggle style</button>
    </div>
  )
}
