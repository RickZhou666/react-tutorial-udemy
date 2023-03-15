import React, { useState } from 'react'
import './style.css'

// don't change the Component name "App"
export default function App() {
  const [clickDelete, setClickDelete] = useState(false)

  const handleClick = () => {
    setClickDelete(!clickDelete)
  }

  let deleteBlock = !clickDelete && (
    <button onClick={handleClick}>Delete</button>
  )
  if (clickDelete) {
    deleteBlock = (
      <div id="alert">
        <h2>Are you sure?</h2>
        <p>These changes can't be reverted!</p>
        <button onClick={handleClick}>Proceed</button>
      </div>
    )
  }

  return <div>{deleteBlock}</div>
}
