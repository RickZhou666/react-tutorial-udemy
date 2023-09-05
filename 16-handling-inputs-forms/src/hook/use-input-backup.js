import { useState } from 'react'

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false) // user is doing nothing

  // custom hook "should be generic"
  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (event) => {
    // this actions is scheduled by React, not get processed immediately
    setEnteredValue(event.target.value)
  }

  const inputBlurHandler = (event) => {
    setIsTouched(true)
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default useInput
