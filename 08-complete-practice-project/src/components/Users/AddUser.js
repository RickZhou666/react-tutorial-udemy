import React, { Fragment, useState, useRef } from 'react'
import Card from '../UI/Card'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'
import classes from './AddUser.module.css'
import Wrapper from '../Helpers/Wrapper'

const AddUser = (props) => {
  const nameInputRef = useRef()
  const ageInputRef = useRef()

  // const [enteredUsername, setEnteredUsername] = useState('')
  // const [enteredAge, setEnteredAge] = useState('')
  const [error, setError] = useState('')

  const handleAddUserSubmit = (event) => {
    event.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredUserAge = ageInputRef.current.value

    console.log(nameInputRef.current.value)
    // if (enteredUsername.trim().length === 0 || enteredAge.trim().length == 0) {
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length == 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      })
      return
    }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      })
      return
    }
    props.onAddUser(enteredName, enteredUserAge)
    // this is highly NOT recommended to manipulate DOM from ref
    nameInputRef.current.value = ''
    ageInputRef.current.value = ''
    // console.log(enteredUsername, enteredAge)
    // setEnteredUsername('')
    // setEnteredAge('')
  }

  // const handleUsernameChange = (event) => {
  //   setEnteredUsername(event.target.value)
  // }
  // const handleAgeChange = (event) => {
  //   setEnteredAge(event.target.value)
  // }

  const handleError = () => {
    setError(null)
  }

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={handleError}
        ></ErrorModal>
      )}

      <Card className={classes.input}>
        <form onSubmit={handleAddUserSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="usernames"
            type="text"
            // value={enteredUsername}
            // onChange={handleUsernameChange}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={handleAgeChange}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  )
}

export default AddUser
