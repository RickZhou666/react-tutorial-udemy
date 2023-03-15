// https://github.com/academind/react-complete-guide-code/blob/13-class-based-cmp/extra-files/UserFinder.js
import { Fragment, Component } from 'react'
import Users from './Users'
import classes from './UserFinder.module.css'
import UsersContext from '../store/users-context'
import ErrorBoundary from './ErrorBoundary'

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ]

class UserFinder extends Component {
  // get access to the context, but can only setup once
  static contextType = UsersContext

  // 1. constructor to store our states
  constructor() {
    super()
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    }
  }

  // if get result from servers
  // componentDidMount() will only run once in initialization
  componentDidMount() {
    // Send http request...
    this.setState({ filteredUsers: this.context.users })
  }

  // 4. useEffect()
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        // if NO 'if' statement this will create an infinite loop
        // cuz componentDidUpdate() will be executed every time the UserFinder component changed
        // as we setXXX the component will change
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      })
    }
  }

  // 2. handler function
  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  // 3. return the JSX
  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.handleSearchChange.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    )
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS)
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     )
//   }, [searchTerm])

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value)
//   }

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={handleSearchChange} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   )
// }

export default UserFinder
