import React, { useState } from 'react'

// don't change the Component name "App"
export default function App() {
  const [msg, setMsg] = useState('Hi')
  const [isValid, setIsValid] = useState(false)

  const handleInput = (event) => {
    setMsg(event.target.value)
    if (msg.trim().length < 3) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  return (
    <form>
      <label>Your message</label>
      <input type="text" onChange={handleInput} />
      {!isValid ? <p>Invalid message</p> : <p>Valid message</p>}
    </form>
  )
}
