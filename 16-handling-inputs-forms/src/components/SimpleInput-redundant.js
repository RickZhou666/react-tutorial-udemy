import { useEffect, useRef, useState } from 'react'

const SimpleInput = (props) => {
  const nameInputRef = useRef()
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false)
  const [enteredNameTouched, setEnteredNameTouched] = useState(false) // user is doing nothing

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log('Name input is valid!')
    }
  })

  const nameInputChangeHandler = (event) => {
    // this actions is scheduled by React, not get processed immediately 
    setEnteredName(event.target.value)

    // set to true as soon as user types something
    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true)
    }
  }

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true)

    // set false if user leaves the input field without entering anything
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false)
    }
  }

  const formSubmissionHandler = (event) => {
    // to tell browser not to send default request
    // and not reload the app
    event.preventDefault()

    setEnteredNameTouched(true)

    // if empty value, return
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false)
      return
    }

    setEnteredNameIsValid(true)
    console.log(enteredName)
    // if you need validate input on every keystroke, you better use state as useRef cannot do that
    const enteredValue = nameInputRef.current.value // current property holds the value you submitted
    console.log(enteredValue)
    // if you want to clear the input after submission
    setEnteredName('')

    // but this is manipulating the DOM directly, we should leave to React to do that
    // nameInputRef.current.value = '' // NOT IDEAL, DON'T MANIPULATE THE DOM
  }

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      {/* <div className="form-control"> */}
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName} // bind here to clear the input after submission
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput
