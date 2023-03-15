import { useState, Component } from 'react'
import User from './User'

import classes from './Users.module.css'

// convert to class-based component
class Users extends Component {
  constructor() {
    super()
    this.state = {
      // in class-based state always object, and named as 'state'
      showUsers: true,
      more: 'Test',
    }
  }

  componentDidUpdate() {
    // try {
    // } catch (error) {
    //   // handle error
    // }

    // if no new users, we throw an error
    if (this.props.users.length === 0) {
      throw new Error('No users provided!')
    }
  }

  toggleUsersHandler() {
    // this.state.showUsers = false // NOT
    // this.setState({showUsers: false}) // it merge state with old state
    this.setState((curState) => {
      return { showUsers: !curState.showUsers }
    })
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    )

    // 1. this key word inside this method (toggleUsersHandler)
    // 2. now set as same context/value when this code (the returen jsx code) was evalauted

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    )
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true)

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState)
//   }

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   )

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   )
// }

export default Users
