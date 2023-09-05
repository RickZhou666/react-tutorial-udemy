import { useEffect, useState } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false) // user is doing nothing
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false) // user is doing nothing

  // after setAction, this variable will ger re-rendered
  const enteredNameIsValid = enteredName.trim() !== ''
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched
  const enteredEmailIsValid = enteredEmail.trim() !== ''
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  // overall validity
  // approach#1
  // const [formIsValid, setFormIsValid] = useState(false) // user is doing nothing
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true)
  //   } else {
  //     setFormIsValid(false)
  //   }
  // }, [enteredNameIsValid])

  // approach#2
  let formIsValid = false
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }

  const nameInputChangeHandler = (event) => {
    // this actions is scheduled by React, not get processed immediately
    setEnteredName(event.target.value)
  }

  const emailInputChangeHandler = (event) => {  
    setEnteredEmail(event.target.value)
  }

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true)
  }
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true)
  }

  const formSubmissionHandler = (event) => {
    // to tell browser not to send default request
    // and not reload the app
    event.preventDefault()

    setEnteredNameTouched(true)
    setEnteredEmailTouched(true)

    // if empty value, return
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return
    }

    console.log(enteredName)
    console.log(enteredEmail)

    // if you want to clear the input after submission
    setEnteredName('')
    setEnteredNameTouched(false)
    setEnteredEmail('')
    setEnteredEmailTouched(false)
    // but this is manipulating the DOM directly, we should leave to React to do that
    // nameInputRef.current.value = '' // NOT IDEAL, DON'T MANIPULATE THE DOM
  }

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control'
  const emailInputClasses = emailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      {/* <div className="form-control"> */}
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
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
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail} // bind here to clear the input after submission
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput
