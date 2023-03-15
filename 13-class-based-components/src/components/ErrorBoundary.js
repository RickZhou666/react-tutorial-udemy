import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = { hasError: false }
  }

  // can be added to any class-based components
  // and make that class-based component a error boundary
  // u cannot add to functional component at the moment
  componentDidCatch(error) {
    console.log(error)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>
    }

    // we want to wrap a component should be protected by this ErrorBoundary class
    return this.props.children
  }
}

export default ErrorBoundary
