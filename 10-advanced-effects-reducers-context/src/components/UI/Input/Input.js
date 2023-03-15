import React, { useRef, useImperativeHandle } from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef()

  //   useEffect(() => {
  //     inputRef.current.focus() // after render we focus on this component
  //   }, [])

  const activate = () => {
    inputRef.current.focus()
  }

  // transition object between internal functionality and outside world
  useImperativeHandle(ref, () => {
    return {
      focusOnScope: activate,
    }
  })

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor="props.id">{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  )
})

export default Input
