import classes from './User.module.css'
import { Component } from 'react'

// 'Component' has 'this' property
class User extends Component {
  // useEffect(() => {return() => {...}}, [])
  componentWillUnmount() {
    console.log('User will unmount!')
  }

  // equavilent to the return in functional component
  render() {
    return <li className={classes.user}>{this.props.name}</li>
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>
// }

export default User
