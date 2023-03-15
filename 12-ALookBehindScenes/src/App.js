import React, { useState, useCallback } from 'react'

import './App.css'
import Button from './components/UI/Button/Button'
import DemoOutput from './components/Demo/DemoOutput'

function App() {
  const [showParagraph, setShowParagraph] = useState(false)
  const [allowToggle, setAllowToggle] = useState(false)

  console.log('1st APP RUNNING')

  const handleToggleParagraph = useCallback(() => {
    // short term
    // setShowParagraph(!showParagraph)

    // as we depend on previous state, we better to use below format
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph)
      console.log('2nd APP RUNNING inside handler')
    }
  }, [allowToggle]) // anything in running arguments should be specified there []

  const handleAllowToggle = () => {
    setAllowToggle(true)
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={handleAllowToggle}>Allow Toggle!</Button>
      <Button onClick={handleToggleParagraph}>Toggle Paragraph!</Button>
    </div>
  )
}

export default App
