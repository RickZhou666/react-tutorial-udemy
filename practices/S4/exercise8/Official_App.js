import React, { useState } from 'react'

// don't change the Component name "App"
export default function App() {
  const [val, setVal] = useState(0)
  function handleClick() {
    setVal((preVal) => val + 1)
  }

  return (
    <div>
      <p id="counter">{val}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}
