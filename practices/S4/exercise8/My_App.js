import React, { useState } from 'react'

// don't change the Component name "App"
export default function App() {
  const [val, setVal] = useState(0)
  function handleClick() {
    setVal(val + 1)
    console.log(val)
  }

  return (
    <div>
      <p id="counter"></p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}
