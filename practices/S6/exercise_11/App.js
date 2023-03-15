import React, { useState } from 'react'

// don't change the Component name "App"
export default function App() {
  const [toggleStyle, setToggleStyle] = useState(true)
  const handleClick = () => {
    setToggleStyle(!toggleStyle)
  }

  return (
    <div>
      <p style={{ color: toggleStyle ? 'white' : 'red' }}>Style me!</p>
      <button onClick={handleClick}>Toggle style</button>
    </div>
  )
}
