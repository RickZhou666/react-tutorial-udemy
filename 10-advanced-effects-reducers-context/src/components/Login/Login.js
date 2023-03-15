import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react'

import classes from './Login.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import AuthContext from '../../context/auth-context'

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [enteredPassword, setEnteredPassword] = useState('')
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    // isValid: false,
    isValid: undefined,
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    // isValid: false,
    isValid: undefined,
  })

  const authCtx = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  // Object destructuring
  //  with alias assignment: isValid => emailIsValid
  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    console.log('EFFECT RUNNING')

    return () => {
      console.log('EFFECT CLEANUP')
    }
  }, [])

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      console.log('checking for validity!')
      // setFormIsValid( emailState.value.includes('@') && passwordState.value.trim().length > 6 )
      // setFormIsValid(emailState.isValid && passwordState.isValid)
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)

    return () => {
      console.log('CLEANUP')
      clearTimeout(timerIdentifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value)
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // )
  }

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value)
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

    // 1. useEffect()
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // )

    // 2. useReducer()
    // setFormIsValid(
    // event.target.value.trim().length > 6 && emailState.value.includes('@')

    // event.target.value.trim().length > 6 && emailState.isValid
    // passwordState.isValid && emailState.isValid
    // )
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'))
    // setEmailIsValid(emailState.value.includes('@'))
    // setEmailIsValid(emailState.isValid)
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6)
    dispatchPassword({ type: 'INPUT_BLUR' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value)
    } else if (!emailIsValid) {
      // emailInputRef.current.activate()
      emailInputRef.current.focusOnScope()
    } else {
      // passwordInputRef.current.activate()
      passwordInputRef.current.focusOnScope()
    }

    // props.onLogin(enteredEmail, enteredPassword)
    // props.onLogin(emailState.value, enteredPassword)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
