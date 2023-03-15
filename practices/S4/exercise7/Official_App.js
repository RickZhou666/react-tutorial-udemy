import React, { useState } from 'react'

// don't change the Component name "App"
export default function App() {
  const [msg, setMsg] = useState('Invalid')

  const handleInput = (event) => {
    const value = event.target.value
    if (value.trim().length < 3) {
      setMsg('Invalid')
    } else {
      setMsg('Valid')
    }
  }

  return (
    <form>
      <label>Your message</label>
      <input type="text" onChange={handleInput} />
      <p>{msg} message</p>
    </form>
  )
}
