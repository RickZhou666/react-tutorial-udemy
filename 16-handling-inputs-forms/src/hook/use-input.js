import { useReducer } from 'react'

const initialInputState = {
  value: '',
  isTouched: false,
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched } // use previous state of isTouched
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value }
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' }
  }
  return inputStateReducer
}

const useInput = (validateValue) => {
  // 1st is state managed by reducer, 2nd is dispatch function
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  )

  const valueIsValid = validateValue(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value })
  }

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }
}

export default useInput
